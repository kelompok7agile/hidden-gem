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

const getAll = async ({
  page = 1,
  limit = 10,
  cari = null,
  sort = "kategori_tempat_id.asc",
}) => {
  const offset = (page - 1) * limit;

  let query = supabase.from("kategori_tempat").select("*", { count: "exact" });

  if (cari) {
    query = query.ilike("nama", `%${cari}%`);
  }

  if (sort) {
    const [column, order] = sort.split(".");
    query = query.order(column, { ascending: order === "asc" });
  }

  const { data, error, count } = await query.range(offset, offset + limit - 1);

  console.log('data', data);
  console.log('cari', cari);

  if (error) throw error;

  return {
    data,
    total_data: count,
  };
};

const countAll = async () => {
  const { count, error } = await supabase
    .from("kategori_tempat")
    .select("*", { count: "exact" });

  console.log("count", count);

  if (error) throw error;

  return count;
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
  countAll,
};
