const supabase = require("../config/database");

const findByNama = async (nama) => {
  const { data, error } = await supabase
    .from("kategori_tempat")
    .select("kategori_tempat_id, nama, icon")
    .eq("nama", nama)
    .maybeSingle();

  if (error) throw error;

  return data;
};

const getAll = async () => {
  const { data, error } = await supabase
    .from("kategori_tempat")
    .select("kategori_tempat_id, nama, icon")
    .order("kategori_tempat_id", { ascending: true });

  if (error) throw error;

  return data;
};

const update = async (id, updateData) => {
  const { data, error } = await supabase
    .from("kategori_tempat")
    .update(updateData)
    .eq("kategori_tempat_id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const deleteData = async (id) => {
  await supabase.from("kategori_tempat").delete().eq("kategori_tempat_id", id);

  return {
    data: "Data kategori tempat berhasil dihapus",
    error: null,
  };
};

const insert = async (data) => {
  const { data: result, error } = await supabase
    .from("kategori_tempat")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
};

module.exports = {
  getAll,
  update,
  deleteData,
  insert,
  findByNama,
};
