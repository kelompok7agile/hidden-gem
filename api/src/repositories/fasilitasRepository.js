const supabase = require("../config/database");


const getAll = async () => {
  const { data, error } = await supabase
    .from("fasilitas")
    .select("*")
    .order("fasilitas_id", { ascending: true });
  if (error) throw error;
  return data;
};

const insert = async (data) => {
  const { data: result, error } = await supabase
    .from("fasilitas")
    .insert([data])
    .select()
    .single();
  if (error) throw error;
  return result;
};

const update = async (id, data) => {
  const { data: result, error } = await supabase
    .from("fasilitas")
    .update(data)
    .eq("fasilitas_id", id)
    .select()
    .single();
  if (error) throw error;
  return result;
};

const remove = async (id) => {
  const { data, error } = await supabase
    .from("fasilitas")
    .delete()
    .eq("fasilitas_id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const findByNama = async (nama) => {
  const { data, error } = await supabase
    .from("fasilitas")
    .select("*")
    .ilike("nama", nama)
    .maybeSingle();
  if (error) throw error;
  return data;
};

module.exports = {
  getAll,
  insert,
  update,
  remove,
  findByNama,
};
