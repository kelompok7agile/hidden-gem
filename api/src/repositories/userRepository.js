const supabase = require("../config/database");

const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from("user")
      .select(
        `
          user_id,
          nama,
          email,
          no_telepon,
          user_group_id,
          user_group (
            nama
          )
        `
      )
      .order("user_id", { ascending: true });

    if (error) {
      console.error("Error fetching all users:", error.message);
      throw error;
    }

    console.log("Fetched users:", data);
    return data;
  } catch (err) {
    console.error("Unexpected error fetching all users:", err.message);
    throw err;
  }
};

//cari email user
const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("user")
    .select("user_id, nama, email, password, salt_password, user_group_id") // hanya mengambil kolom nama dan email
    .eq("email", email)
    .maybeSingle(); // mengambil satu baris data

  if (error) {
    console.error("Error finding user by email:", error.message);
    throw error;
  }
  return data;
};

//buat user baru
const createUser = async (user) => {
  console.log("Inserting user:", user);

  const { data, error } = await supabase
    .from("user")
    .insert([user])
    .select("nama, email, no_telepon");

  if (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }

  console.log("Insert result:", data);

  if (!data || data.length === 0) {
    throw new Error("Failed to create user: No rows returned");
  }

  return data;
};

const updateUser = async (userId, userData) => {
  if (!userId) {
    throw new Error("User ID wajib diisi");
  }

  const { nama, email, no_telepon, password, salt_password, profile_img } =
    userData;

  if (!nama || !email || !no_telepon) {
    throw new Error("Nama, email, dan no telepon wajib diisi");
  }

  const { data, error } = await supabase
    .from("user")
    .update({
      nama,
      email,
      no_telepon,
      ...(password && { password }),
      ...(salt_password && { salt_password }),
      ...(profile_img && { profile_img }),
    })
    .eq("user_id", userId)
    .select();

  if (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }

  return data;
};

module.exports = {
  findUserByEmail,
  createUser,
  getAllUsers,
  updateUser,
};
