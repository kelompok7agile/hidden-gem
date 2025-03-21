const bcrypt = require("bcrypt");

/**
 * Hash password menggunakan bcrypt
 * @param {string} password - Password asli
 * @returns {object} - Object berisi hashedPassword dan salt
 */
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Jumlah putaran hashing
    const salt = await bcrypt.genSalt(saltRounds); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password dengan salt
    return { hashedPassword, salt }; // Kembalikan hash dan salt
  } catch (error) {
    console.error("Error saat melakukan hashing password:", error.message);
    throw new Error("Gagal saat melakukan hashing password");
  }
};

/**
 * Bandingkan password asli dengan hashed password
 * @param {string} password - Password asli
 * @param {string} hashedPassword - Password yang sudah di-hash
 * @returns {boolean} - True jika password cocok, false jika tidak
 */
const comparePassword = async (password, hashedPassword) => {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch; // Kembalikan hasil perbandingan
    } catch (error) {
      console.error("Error saat membandingkan password:", error.message);
      throw new Error("Gagal saat membandingkan password");
    }
  };

module.exports = { hashPassword, comparePassword };