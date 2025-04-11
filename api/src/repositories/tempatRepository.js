const supabase = require("../config/database");
require("dotenv").config();
const path = require("path");
const fs = require("fs-extra");

const convertJamOperasional = (jamObj) => {
  if (!jamObj || typeof jamObj !== "object") return [];

  const hariUrut = [
    "senin",
    "selasa",
    "rabu",
    "kamis",
    "jumat",
    "sabtu",
    "minggu",
  ];

  return hariUrut.map((hari) => {
    const jam = jamObj[hari];
    return {
      hari,
      buka: jam?.buka || null,
      tutup: jam?.tutup || null,
      libur: jam === null,
    };
  });
};

const getAllTempat = async ({
  nama,
  kategori = [],
  fasilitas = [],
  limit = 20,
  offset = 0,
}) => {
  let query = supabase
    .from("tempat")
    .select(
      "tempat_id, nama, deskripsi, alamat, link_gmaps, jam_operasional, list_kategori_tempat_id, list_fasilitas_id",
      { count: "exact" }
    )
    .is("dihapus_pada", null);

  if (nama) {
    query = query.ilike("nama", `%${nama}%`);
  }

  if (Array.isArray(kategori) && kategori.length > 0) {
    const kategoriFilter = kategori
      .map((id) => `list_kategori_tempat_id.ilike.%${id}%`)
      .join(",");
    query = query.or(kategoriFilter);
  }

  if (Array.isArray(fasilitas) && fasilitas.length > 0) {
    const fasilitasFilter = fasilitas
      .map((id) => `list_fasilitas_id.ilike.%${id}%`)
      .join(",");
    query = query.or(fasilitasFilter);
  }

  query = query.range(offset, offset + limit - 1);

  const { data: tempatList, error, count } = await query;
  if (error) {
    console.error("Gagal mengambil data tempat:", error.message);
    throw error;
  }

  const tempatIds = tempatList.map((t) => t.tempat_id);

  const { data: fotoData } = await supabase
    .from("foto_tempat")
    .select("tempat_id, foto, user:user_id(user_group_id)")
    .in("tempat_id", tempatIds);

  const thumbnailByTempat = {};
  fotoData
    ?.filter((f) => f.user?.user_group_id === "01")
    .forEach((foto) => {
      if (!thumbnailByTempat[foto.tempat_id]) {
        thumbnailByTempat[foto.tempat_id] = foto.foto;
      }
    });

  const { data: ratingData } = await supabase
    .from("rating")
    .select("tempat_id, rating")
    .in("tempat_id", tempatIds);

  const ratingByTempat = {};
  ratingData?.forEach(({ tempat_id, rating }) => {
    if (!ratingByTempat[tempat_id]) {
      ratingByTempat[tempat_id] = [];
    }
    ratingByTempat[tempat_id].push(rating);
  });

  const allKategoriIds = [
    ...new Set(
      tempatList.flatMap((t) =>
        (t.list_kategori_tempat_id || "")
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      )
    ),
  ];

  const allFasilitasIds = [
    ...new Set(
      tempatList.flatMap((t) =>
        (t.list_fasilitas_id || "")
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean)
      )
    ),
  ];

  const { data: kategoriData } = await supabase
    .from("kategori_tempat")
    .select("kategori_tempat_id, nama")
    .in("kategori_tempat_id", allKategoriIds);

  const { data: fasilitasData } = await supabase
    .from("fasilitas")
    .select("fasilitas_id, nama")
    .in("fasilitas_id", allFasilitasIds);

  const kategoriMap = {};
  kategoriData?.forEach(
    (item) => (kategoriMap[item.kategori_tempat_id] = item.nama)
  );

  const fasilitasMap = {};
  fasilitasData?.forEach(
    (item) => (fasilitasMap[item.fasilitas_id] = item.nama)
  );

  const tempatDenganDetail = tempatList.map((tempat) => {
    const ratings = ratingByTempat[tempat.tempat_id] || [];
    const avgRating =
      ratings.length > 0
        ? parseFloat(
            (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
          )
        : 0;

    const kategori = (tempat.list_kategori_tempat_id || "")
        .split(",")
        .map((id) => kategoriMap[id.trim()])
        .filter(Boolean)
        .join(", ");
      

    const fasilitas = (tempat.list_fasilitas_id || "")
      .split(",")
      .map((id) => fasilitasMap[id.trim()])
      .filter(Boolean);

    const filename = thumbnailByTempat[tempat.tempat_id];

    const filePath = path.join(
      __dirname,
      "../../uploads/dokumen",
      filename || ""
    );
    const fileExists = filename && fs.existsSync(filePath);

    return {
      tempat_id: tempat.tempat_id,
      nama: tempat.nama,
      deskripsi: tempat.deskripsi,
      alamat: tempat.alamat,
      link_gmaps: tempat.link_gmaps,
      jam_operasional: convertJamOperasional(tempat.jam_operasional),
      thumbnail: fileExists
        ? `${process.env.API_BASE_URL}/dokumen/${filename}`
        : null,
      rating_count: avgRating,
      kategori,
      fasilitas,
    };
  });

  return {
    data: tempatDenganDetail,
    total_data: count || 0,
  };
};

const getTempatById = async (id) => {
  try {
    const { data: tempat, error: tempatError } = await supabase
      .from("tempat")
      .select(
        "tempat_id, nama, deskripsi, alamat, link_gmaps, jam_operasional, list_kategori_tempat_id, list_fasilitas_id"
      )
      .eq("tempat_id", id)
      .single();
    if (tempatError) throw tempatError;

    const kategoriIds = tempat.list_kategori_tempat_id
      ? tempat.list_kategori_tempat_id.split(",")
      : [];
    const { data: kategori, error: kategoriError } = await supabase
      .from("kategori_tempat")
      .select("nama")
      .in("kategori_tempat_id", kategoriIds);
    if (kategoriError) throw kategoriError;

    const fasilitasIds = tempat.list_fasilitas_id
      ? tempat.list_fasilitas_id.split(",")
      : [];
    const { data: fasilitas, error: fasilitasError } = await supabase
      .from("fasilitas")
      .select("nama")
      .in("fasilitas_id", fasilitasIds);
    if (fasilitasError) throw fasilitasError;

    const { data: fotoData, error: fotoError } = await supabase
      .from("foto_tempat")
      .select("foto, user:user_id(user_group_id)")
      .eq("tempat_id", id);

    const buildFotoUrl = (filename) => {
      const filePath = path.join(
        __dirname,
        "../../uploads/dokumen",
        filename || ""
      );
      const fileExists = filename && fs.existsSync(filePath);
      return fileExists ? `${process.env.API_BASE_URL}/dokumen/${filename}` : null;
    };

    if (fotoError) throw fotoError;
    const detail_foto = fotoData
      .filter((foto) => foto.user?.user_group_id === "01")
      .map((f) => buildFotoUrl(f.foto))
      .filter(Boolean);

    const galery = fotoData
      .filter((foto) => foto.user?.user_group_id === "02")
      .map((f) => buildFotoUrl(f.foto))
      .filter(Boolean);

    const ratingData = await supabase
      .from("rating")
      .select("rating")
      .eq("tempat_id", id);

    const ratings = ratingData.data || [];

    const avgRating =
      ratings.length > 0
        ? parseFloat(
            (ratings.reduce((a, b) => a + b.rating, 0) / ratings.length).toFixed(2)
          )
        : 0;

    return {
      ...tempat,
      kategori: kategori.map((item) => item.nama).join(", "),
      fasilitas: fasilitas.map((item) => item.nama),
      foto: [...detail_foto, ...galery],
      jam_operasional: convertJamOperasional(tempat.jam_operasional),
      rating_count: avgRating,
    };
  } catch (error) {
    console.error("Kesalahan saat mengambil detail tempat:", error.message);
    throw error;
  }
};

const insertTempat = async (data) => {
  const { data: result, error } = await supabase
    .from("tempat")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
};

const insertFotoTempat = async (fotoData) => {
  const { data, error } = await supabase.from("foto_tempat").insert([fotoData]);

  if (error) throw error;
  return data;
};

const updateTempat = async (id, updateData) => {
  const { data, error } = await supabase
    .from("tempat")
    .update(updateData)
    .eq("tempat_id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const deleteFotoTempat = async (id) => {
  const { data, error } = await supabase
    .from("foto_tempat")
    .delete()
    .eq("foto_tempat_id", id);

  if (error) throw error;
  return data;
};

const deleteTempat = async (id) => {
  const { data, error } = await supabase
    .from("tempat")
    .update({ dihapus_pada: new Date() })
    .eq("tempat_id", id);

  if (error) throw error;
  return data;
};

const getFotoTempatByTempatId = async (tempat_id) => {
  const { data, error } = await supabase
    .from("foto_tempat")
    .select("foto_tempat_id, foto")
    .eq("tempat_id", tempat_id)
    .is("dihapus_pada", null);

  if (error) throw error;
  return data;
};

const softDeleteTempat = async (id, updateData) => {
  const { data, error } = await supabase
    .from("tempat")
    .update(updateData)
    .eq("tempat_id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

module.exports = {
  getAllTempat,
  getTempatById,
  insertTempat,
  insertFotoTempat,
  updateTempat,
  deleteFotoTempat,
  deleteTempat,
  getFotoTempatByTempatId,
  softDeleteTempat,
};
