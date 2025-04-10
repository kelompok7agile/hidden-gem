const tempatService = require("../services/tempatService");
const { formatMessage, formatPaginatedMessage } = require("../utils/formatter");

const getAllTempat = async (req, res) => {
  try {
    const { nama, kategori, fasilitas } = req.query;

    const tempat = await tempatService.getAllTempat({
      nama,
      kategori,
      fasilitas
    });

    res.status(200).json(formatMessage("Data tempat berhasil diambil", tempat));
  } catch (error) {
    console.error("Kesalahan saat mengambil data tempat:", error.message);
    res.status(500).json(formatMessage("Terjadi kesalahan saat mengambil data tempat", null, 500));
  }
};


const getTempatById = async (req, res) => {
  const { id } = req.params;
  try {
    const tempat = await tempatService.getTempatById(id);
    if (!tempat) {
      return res
        .status(404)
        .json(formatMessage("Tempat tidak ditemukan", null, 404));
    }
    res.status(200).json(formatMessage("Data tempat berhasil diambil", tempat));
  } catch (error) {
    console.error("Kesalahan saat mengambil data tempat:", error.message);
    res
      .status(500)
      .json(
        formatMessage("Terjadi kesalahan saat mengambil data tempat", null, 500)
      );
  }
};

const compareTempat = async (req, res) => {
  try {
    const { tempat1, tempat2 } = req.query;

    if (!tempat1 || !tempat2) {
      return res.status(400).json({ message: "Parameter tempat1 dan tempat2 wajib diisi" });
    }

    const hasil = await tempatService.compareTempat(tempat1, tempat2);

    res.status(200).json({
      success: true,
      message: "Berhasil membandingkan tempat",
      data: hasil,
    });
  } catch (error) {
    console.error("Error saat membandingkan tempat:", error.message);
    res.status(500).json({ success: false, message: "Gagal membandingkan tempat" });
  }
};

const createTempat = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const tempatBaru = await tempatService.createTempat(req.body, req.files, user_id);

    res.status(201).json({
      success: true,
      message: "Tempat berhasil ditambahkan",
      data: tempatBaru,
    });
  } catch (error) {
    console.error("Error saat menambahkan tempat:", error.message);
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const filePath = path.join(__dirname, "../../uploads/foto_tempat", file.filename);
        fs.unlink(filePath, (err) => {
          if (err) console.error("Gagal hapus file:", file.filename, err.message);
        });
      }
    }
    res.status(500).json({ success: false, message: "Gagal menambahkan tempat" });
  }
};

const fs = require("fs");
const path = require("path");

const updateTempat = async (req, res) => {
  const tempat_id = req.params.id;
  const user_id = req.user.user_id;

  try {
    const tempat = await tempatService.updateTempat(tempat_id, req.body, req.files, user_id);

    res.status(200).json({
      success: true,
      message: "Tempat berhasil diubah",
      data: tempat,
    });
  } catch (error) {
    if (req.files) {
      for (const file of req.files) {
        const filePath = path.join(__dirname, "../../uploads/foto_tempat", file.filename);
        fs.unlink(filePath, (err) => {
          if (err) console.error("Gagal hapus file:", file.filename);
        });
      }
    }

    console.error("Error saat mengubah tempat:", error.message);
    res.status(500).json({ success: false, message: "Gagal mengubah tempat" });
  }
};

const hapusTempat = async (req, res) => {
  try {
    const { tempat_id } = req.body;
    const user_id = req.user.user_id;

    if (!tempat_id) {
      return res.status(400).json({ success: false, message: "tempat_id wajib diisi" });
    }

    const result = await tempatService.hapusTempat(tempat_id, user_id);

    res.status(200).json({
      success: true,
      message: "Tempat berhasil dihapus",
      data: result
    });
  } catch (error) {
    console.error("Gagal menghapus tempat:", error.message);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus tempat"
    });
  }
};






module.exports = {
  getAllTempat,
  getTempatById,
  compareTempat,
  createTempat,
  updateTempat,
  hapusTempat
};
