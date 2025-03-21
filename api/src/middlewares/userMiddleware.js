const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      // Ambil token dari header Authorization
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token tidak ditemukan" });
      }

      // Verifikasi token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Simpan data user ke dalam request
      req.user = decoded;

      // Cek role berdasarkan user_group_id
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: Anda tidak memiliki akses" });
      }

      next(); // Lanjutkan ke handler berikutnya
    } catch (error) {
      console.error("Error di authMiddleware:", error.message);
      res.status(403).json({ message: "Invalid or expired token", error: error.message });
    }
  };
};

const validationResultMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validasi gagal',
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  authMiddleware,
  validationResultMiddleware,
};