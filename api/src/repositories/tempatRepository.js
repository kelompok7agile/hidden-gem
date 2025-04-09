const supabase = require("../config/database");

const getAllTempat = async ({ nama, kategori = [] } = {}) => {
  let query = supabase
    .from("tempat")
    .select("tempat_id, nama, deskripsi, alamat, link_gmaps, jam_operasional")
    .is("dihapus_pada", null);

  if (nama) {
    query = query.ilike("nama", `%${nama}%`);
  }

  if (Array.isArray(kategori) && kategori.length > 0) {
    query = query.or(
      kategori.map((id) => `list_kategori_tempat_id.ilike.%${id}%`).join(",")
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Gagal mengambil data tempat:", error.message);
    throw error;
  }

  return data;
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
    if (tempatError) {
      throw tempatError;
    }

    const kategoriIds = tempat.list_kategori_tempat_id
      ? tempat.list_kategori_tempat_id.split(",")
      : [];
    const { data: kategori, error: kategoriError } = await supabase
      .from("kategori_tempat")
      .select("nama")
      .in("kategori_tempat_id", kategoriIds);
    if (kategoriError) {
      throw kategoriError;
    }

    const fasilitasIds = tempat.list_fasilitas_id
      ? tempat.list_fasilitas_id.split(",")
      : [];
    const { data: fasilitas, error: fasilitasError } = await supabase
      .from("fasilitas")
      .select("nama")
      .in("fasilitas_id", fasilitasIds);
    if (fasilitasError) {
      throw fasilitasError;
    }

    return {
      ...tempat,
      kategori: kategori.map((item) => item.nama),
      fasilitas: fasilitas.map((item) => item.nama),
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
