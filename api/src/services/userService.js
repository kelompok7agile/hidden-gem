const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository.js");
const { hashPassword, comparePassword } = require("../utils/hashPassword.js");

const getAllUsers = async () => {
    try {
      // Ambil data user dari repository
      const users = await userRepository.getAllUsers();
  
      // Jika tidak ada data user
      if (!users || users.length === 0) {
        throw new Error("Tidak ada data user yang ditemukan");
      }
  
      return users; // Kembalikan data user
    } catch (error) {
      throw error; // Lempar error ke controller
    }
  };

const register = async (userData) => {
  try {
    const {
      nama,
      email,
      password,
      no_telepon,
      user_group_id = "02",
    } = userData;

    const existingUser = await userRepository.findUserByEmail(email); //pengecekan email
    if (existingUser) {
      return new Error("Email sudah terdaftar");
    }
    // Hash password menggunakan fungsi dari utils
    const { hashedPassword, salt } = await hashPassword(password);

    // Buat user baru
    const newUser = await userRepository.createUser({
      nama,
      email,
      password: hashedPassword,
      salt_password: salt,
      no_telepon,
      user_group_id,
    });
    return newUser; // Kembalikan data user baru
  } catch (error) {
    throw error; // Lempar error ke controller
  }
};

const login = async (email, password) => {
  try {
    //cek email
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    //cek password
    if (!isPasswordMatch) {
        throw new Error("Email atau password salah");
    }
    //cek role
    let role;
    if (user.user_group_id === "01") {
      role = "admin";
    } else if (user.user_group_id === "02") {
      role = "user";
    } else {
        throw new Error("Role tidak valid");
    }
    //generate token jwt
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // const existingToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTc0MjMwNjk5NCwiZXhwIjoxNzQyMzA3MDA0fQ.XHlOhxkVr4c-NuF7MBSRoYnICwZUQZnCsYDZEsuuyPk";
    // const decoded = jwt.verify(existingToken, process.env.JWT_SECRET);

    // if(decoded){
    //   console.log("decoded: ", decoded);
    // }else {
    //   console.log("Expired token");
    // }
    // Hapus data sensitif sebelum mengembalikan respons
    const { password: userPassword, salt_password, ...userWithoutSensitiveData } = user;

    return {
      token,
      role,
      ...userWithoutSensitiveData,
    };
  } catch (error) {
    console.log("kesalahan saat login: ", error);
    throw error;
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
};
