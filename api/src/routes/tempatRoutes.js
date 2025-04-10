const express = require("express");
const router = express.Router();
const tempatController = require("../controllers/tempatController");
const {
  authenticateUser,
  checkRole,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload_tempat");
const validateTempat = require('../middlewares/validateTempat');

router.get("/", tempatController.getAllTempat);
router.get("/compare", authenticateUser, tempatController.compareTempat);
router.patch(
  "/:id",
  authenticateUser,
  checkRole("01"),
  upload.array("foto_tempat", 10),
  validateTempat,
  tempatController.updateTempat
);
router.get("/:id", authenticateUser, tempatController.getTempatById);

//post
router.post(
  "/",
  authenticateUser,
  checkRole("01"),
  upload.array("foto_tempat", 10),
  validateTempat,
  tempatController.createTempat
);
router.post(
  "/hapus",
    authenticateUser,
    checkRole("01"),
    tempatController.hapusTempat
);

module.exports = router;
