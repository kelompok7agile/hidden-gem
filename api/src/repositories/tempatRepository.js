const supabase = require("../config/database");

const getAllTempat = async ({ nama, kategori = [], fasilitas = [] } = {}) => {
  let query = supabase
    .from("tempat")
    .select("tempat_id, nama, deskripsi, alamat, link_gmaps, jam_operasional")
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

  const { data: tempatList, error } = await query;

  if (error) {
    console.error("Gagal mengambil data tempat:", error.message);
    throw error;
  }

  if (!tempatList || tempatList.length === 0) {
    return [];
  }

  const tempatIds = tempatList.map((t) => t.tempat_id);

  const { data: fotoData, error: fotoError } = await supabase
    .from("foto_tempat")
    .select("tempat_id, foto, user:user_id(user_group_id)")
    .in("tempat_id", tempatIds);

  if (fotoError) {
    console.error("Gagal mengambil foto tempat:", fotoError.message);
    throw fotoError;
  }

  const fotoByTempat = {};
  fotoData
    .filter((foto) => foto.user?.user_group_id === "01")
    .forEach((foto) => {
      if (!fotoByTempat[foto.tempat_id]) {
        fotoByTempat[foto.tempat_id] = [];
      }
      fotoByTempat[foto.tempat_id].push(foto.foto);
  });

  const { data: ratingData, error: ratingError } = await supabase
  .from("rating")
  .select("tempat_id, rating")
  .in("tempat_id", tempatIds);

  if (ratingError) {
    console.error("Gagal mengambil data rating:", ratingError.message);
    throw ratingError;
  }

  const ratingByTempat = {};
  ratingData.forEach(({ tempat_id, rating }) => {
    if (!ratingByTempat[tempat_id]) {
      ratingByTempat[tempat_id] = [];
    }
    ratingByTempat[tempat_id].push(rating);
  });

  const tempatDenganFoto = tempatList.map((tempat) => {
    const ratings = ratingByTempat[tempat.tempat_id] || [];
    const avgRating =
      ratings.length > 0
        ? parseFloat((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2))
        : 0;
  
    return {
      ...tempat,
      detail_foto: fotoByTempat[tempat.tempat_id] || [],
      rating_count: avgRating,
    };
  });

  return tempatDenganFoto;
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

    if (fotoError) throw fotoError;

    const detail_foto = fotoData.filter((foto) => foto.user?.user_group_id === "01").map((f) => f.url);
    const galery = fotoData.filter((foto) => foto.user?.user_group_id !== "02").map((f) => f.url);

    return {
      ...tempat,
      kategori: kategori.map((item) => item.nama),
      fasilitas: fasilitas.map((item) => item.nama),
      detail_foto,
      galery,
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
