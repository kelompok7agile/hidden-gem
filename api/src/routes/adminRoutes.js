const express = require("express");
const adminController = require("../controllers/adminController");
const {
  authenticateUser,
  checkRole,
} = require("../middlewares/authMiddleware");
const router = express.Router();

// Endpoint khusus admin
router.get(
  "/dashboard",
  authenticateUser,
  checkRole("01"),
  adminController.getAdminDashboard
);
router.post(
  "/manage-users",
  authenticateUser,
  checkRole("01"),
  adminController.manageUsers
);
router.get(
  "/manajemen-user",
  authenticateUser,
  checkRole("01"),
  adminController.getManajemenUser
);
router.get(
  "/master-kategori-tempat",
  authenticateUser,
  checkRole("01"),
  adminController.getAllKategoriTempat
);
router.post(
  "/master-kategori-tempat/ubah",
  authenticateUser,
  checkRole("01"),
  adminController.updateKategoriTempat
);
router.post(
  "/master-kategori-tempat/hapus",
  authenticateUser,
  checkRole("01"),
  adminController.hapusKategoriTempat
);
router.post(
  "/master-kategori-tempat/tambah",
  authenticateUser,
  checkRole("01"),
  adminController.tambahKategoriTempat
);

router.get(
 "/master-fasilitas",
authenticateUser,
checkRole("01"),
adminController.getAllFasilitas
)

router.post(
  "/master-fasilitas/ubah",
  authenticateUser,
  checkRole("01"),
  adminController.updateFasilitas
);

router.post(
  "/master-fasilitas/hapus",
  authenticateUser,
  checkRole("01"),
  adminController.hapusFasilitas
);

router.post(
  "/master-fasilitas/tambah",
  authenticateUser,
  checkRole("01"),
  adminController.tambahFasilitas
);

module.exports = router;
