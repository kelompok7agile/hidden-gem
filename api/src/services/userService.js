const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository.js");
const { hashPassword, comparePassword } = require("../utils/hashPassword.js");
const { getInitials } = require("../utils/initialsNameUtils.js");

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

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      return new Error("Email sudah terdaftar");
    }
    const { hashedPassword, salt } = await hashPassword(password);

    const createUser = await userRepository.createUser({
      nama,
      email,
      password: hashedPassword,
      salt_password: salt,
      no_telepon,
      user_group_id,
    });

    if (!createUser) {
      throw new Error("Gagal membuat user baru");
    }

    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User tidak ditemukan setelah pendaftaran");
    }
    const { new_password, salt_password, ...other } = user;
    return other;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordMatch = await comparePassword(password, user.password);
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
    const token = jwt.sign(
      { user_id: user.user_id, user_group_id: user.user_group_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const {
      password: userPassword,
      salt_password,
      ...userWithoutSensitiveData
    } = user;
    console.log("ini user: ", userWithoutSensitiveData);
    return {
      token,
      role,
      short_name: getInitials(user.nama),

      ...userWithoutSensitiveData,
    };
  } catch (error) {
    console.log("kesalahan saat login: ", error);
    throw error;
  }
};

const updateProfile = async (user_id, userData, file) => {
  const { nama, email, no_telepon, password } = userData;

  try {
    let hashedPassword, salt;
    if (password && password.length >= 8) {
      const result = await hashPassword(password);
      hashedPassword = result.hashedPassword;
      salt = result.salt;
    }

    const updateData = {
      nama,
      email,
      no_telepon,
      ...(hashedPassword && { password: hashedPassword, salt_password: salt }),
      short_name: getInitials(nama),
    };

    if (file) {
      updateData.profile_img = file.filename;
    }

    const updatedUser = await userRepository.updateUser(user_id, updateData);

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const getProfile = async (user_id) => {
  try {
    const user = await userRepository.getUserById(user_id);

    if (!user) {
      throw new Error("Tidak ada data user yang ditemukan");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const getOpsi = async (value) => {
  try {
    const data = await userRepository.getOpsi(value);

    if (!data) {
      throw new Error("Tidak ada data yang ditemukan");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  updateProfile,
  getProfile,
  getOpsi,
};
