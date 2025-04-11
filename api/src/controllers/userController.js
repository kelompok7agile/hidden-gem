const { updateUser } = require("../repositories/userRepository");
const userService = require("../services/userService");
const fs = require("fs-extra");
const path = require("path");
const { formatMessage, formatPaginatedMessage } = require("../utils/formatter");

const getAllUsers = async (res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json(formatMessage("Data user berhasil diambil", users));
  } catch (error) {
    console.error("Kesalahan saat mengambil data user:", error.message);

    res
      .status(500)
      .json(
        formatMessage("Terjadi kesalahan saat mengambil data user", null, 500)
      );
  }
};

const register = async (req, res) => {
  try {
    const newUser = await userService.register(req.body);
    res.status(201).json(formatMessage("User berhasil didaftarkan", newUser, 201));
  } catch (error) {
    console.error("Kesalahan saat membuat user:", error.message);
    res
      .status(500)
      .json(formatMessage("Terjadi kesalahan saat membuat user", 500));
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if(!email || !password || email === "" || password === "") {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "Email dan password tidak boleh kosong",
      });
    }
    const data = await userService.login(email, password);
    return res.status(200).json({
      success: true,
      code: 200,
      message: "Login berhasil",
      data
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Email atau password salah",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { user_id } = req.user;

    const updatedUser = await userService.updateProfile(
      user_id,
      req.body,
      req.file
    );

    res.status(200).json(formatMessage("Profile berhasil diubah", updatedUser));
  } catch (error) {
    if (req.file) {
      const filePath = path.join(
        __dirname,
        "../../uploads/dokumen",
        req.file.filename
      );
      fs.unlinkSync(filePath, (err) => {
        if (err) console.error("Gagal menghapus file:", err.message);
      });
    }
    console.error("Kesalahan saat mengubah profile:", error.message);
    res
      .status(500)
      .json(
        formatMessage(
          "Terjadi kesalahan saat mengubah profile",
          error.message,
          500
        )
      );
  }
};

const getProfile = async (req, res) => {
  try {
    const { user_id } = req.user;

    const user = await userService.getProfile(user_id);

    res.status(200).json(formatMessage("Profile berhasil diambil", user));
  } catch (error) {
    console.error("Kesalahan saat mengambil profile:", error.message);
    res
      .status(500)
      .json(formatMessage("Terjadi kesalahan saat mengambil profile", 500));
  }
};

const getOpsi = async (req, res) => {
  try {

    const opsi_value = req.params.opsi;
    const opsi = await userService.getOpsi(opsi_value);

    res.status(200).json(formatMessage("Opsi berhasil diambil", opsi));
  } catch (error) {
    console.error("Kesalahan saat mengambil opsi:", error.message);
    res
      .status(500)
      .json(
        formatMessage("Terjadi kesalahan saat mengambil opsi", error.message,  500)
      );
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
  updateProfile,
  getProfile,
  getOpsi,
};
