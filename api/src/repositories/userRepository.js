const supabase = require("../config/database");
require("dotenv").config();
const path = require("path");
const fs = require("fs-extra");

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
          profile_img,
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
    return data.map((user) => {
      const filename = user.profile_img;
      const filePath = path.join(__dirname, "../../uploads/dokumen", filename || "");
      const fileExists = filename && fs.existsSync(filePath);
    
      return {
        ...user,
        profile_img: fileExists
          ? `${process.env.BASE_URL}/dokumen/${filename}`
          : null,
      };
    });
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

const getUserById = async (userId) => {
  const { data, error } = await supabase
    .from("user")
    .select(
      `
        user_id,
        nama,
        email,
        no_telepon,
        profile_img,
        user_group_id,
        user_group (
          nama
        )
      `
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user by ID:", error.message);
    throw error;
  }

  if (data?.profile_img) {
    const filePath = path.join(__dirname, "../../uploads/dokumen", data.profile_img);
    const fileExists = fs.existsSync(filePath);

    data.profile_img = fileExists
      ? `${process.env.BASE_URL}/dokumen/${data.profile_img}`
      : null;

    if (!fileExists) {
      console.warn(`Profile image tidak ditemukan: ${filePath}`);
    }
  } else {
    data.profile_img = null;
  }

  return data;
};

const getOpsi = async (value) => { 

  let data = null;
  if (value == 'fasilitas') {
    const { data: data_value, error } = await supabase
      .from("fasilitas")
      .select("*")
      .order("fasilitas_id", { ascending: true });

    if (error) {
      console.error("Error fetching options:", error.message);
      throw error;
    }

    data = data_value.map((item) => ({
      id: item.fasilitas_id,
      name: item.nama,
      icon: item.icon,
    }));
  } else if (value == 'kategori-tempat') {
    const { data: data_value, error } = await supabase
      .from("kategori_tempat")
      .select("*")
      .order("kategori_tempat_id", { ascending: true });

    if (error) {
      console.error("Error fetching options:", error.message);
      throw error;
    }

    data = data_value.map((item) => ({
      id: item.kategori_tempat_id,
      name: item.nama,
      icon: item.icon,
    }));
  } else {
    throw new Error("Opsi Tidak Ditemukan");
  }

  return data;
}


module.exports = {
  findUserByEmail,
  createUser,
  getAllUsers,
  updateUser,
  getUserById,
  getOpsi,
};
