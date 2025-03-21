const getAdminDashboard = async (req, res) => {
    try {
      const user = req.user; // User sudah diverifikasi oleh middleware
      res.status(200).json({
        message: "Selamat datang di dashboard admin",
        user,
      });
    } catch (error) {
      console.error("Error di adminController:", error.message);
      res.status(500).json({ message: "Terjadi kesalahan di server" });
    }
  };
  
  const manageUsers = async (req, res) => {
    try {
      // Logika untuk mengelola user
      res.status(200).json({ message: "Mengelola user berhasil" });
    } catch (error) {
      console.error("Error di adminController:", error.message);
      res.status(500).json({ message: "Terjadi kesalahan di server" });
    }
  };
  
  module.exports = {
    getAdminDashboard,
    manageUsers,
  };