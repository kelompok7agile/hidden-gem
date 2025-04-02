const userService = require('../services/userService');
const { formatMessage, formatPaginatedMessage } = require('../utils/formatter');

const getAllUsers = async (res) => {
    try {
      // Panggil service untuk mendapatkan semua user
      const users = await userService.getAllUsers();
  
      // Kirim respons sukses
      res.status(200).json(formatMessage("Data user berhasil diambil", users));
    } catch (error) {
      console.error("Kesalahan saat mengambil data user:", error.message);
  
      // Kirim respons error
      res.status(500).json(formatMessage("Terjadi kesalahan saat mengambil data user", null, 500));
    }
  };

const register = async (req, res) => {
    try {
        const newUser = await userService.register(req.body);
        res.status(201).json(formatMessage('User berhasil didaftarkan', newUser));
    } catch (error) {
        console.error('Kesalahan saat membuat user:', error.message);
        res.status(500).json(formatMessage('Terjadi kesalahan saat membuat user', 500));
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userService.login(email, password);
        res.status(200).json(formatMessage('Login berhasil', token));
    } catch (error) {
        console.error('Kesalahan saat login:', error.message);
        res.status(500).json(formatMessage('Terjadi kesalahan saat login', 500));
    }
}

module.exports = {
    getAllUsers,
    register,
    login
};
