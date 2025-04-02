const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpan data user dari token ke dalam request
    req.user = decoded;

    next(); // Lanjutkan ke endpoint berikutnya
  } catch (error) {
    console.error("Error di middleware authenticateUser:", error.message);
    return res.status(401).json({ message: "Unauthorized: Token tidak valid" });
  }
};

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (!req.user || req.user.user_group_id !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: Anda tidak memiliki akses" });
      }
      next(); // Lanjutkan ke endpoint berikutnya
    } catch (error) {
      console.error("Error di middleware checkRole:", error.message);
      return res.status(403).json({ message: "Forbidden: Akses ditolak" });
    }
  };
};

module.exports = { 
    authenticateUser,
    checkRole
};