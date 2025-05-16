const supabase = require("../config/database");

const getAll = async () => {
  const { data, error } = await supabase
    .from("fasilitas")
    .select("*")
    .order("fasilitas_id", { ascending: true });
  if (error) throw error;
  return data;
};

const getAllWithPagination = async ({
  page = 1,
  limit = 10,
  search = null,
}) => {
  let query = supabase
    .from("fasilitas")
    .select("*", { count: "exact" })
    .order("fasilitas_id", { ascending: true })
    .range((page - 1) * limit, page * limit - 1);

  if (search) {
    query = query.ilike("nama", `%${search}%`);
  }

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    data,
    total_data: count,
    halaman_sekarang: page,
    limit_per_halaman: limit,
    total_halaman: Math.ceil(count / limit),
  };
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
  getAllWithPagination,
  insert,
  update,
  remove,
  findByNama,
};
