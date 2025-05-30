const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.hgtoken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token tidak ditemukan" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token tidak valid" });
    }

    req.user = decoded;
    console.log("Decoded token:", decoded);

    next();
  } catch (error) {
    console.error("Error di middleware authenticateUser:", error.message);
    return res.status(401).json({ message: "Unauthorized: Token tidak valid" });
  }
};

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (!req.user || req.user.user_group_id !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: Anda tidak memiliki akses" });
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
  checkRole,
};
