const userService = require("../services/userService");
const kategoriTempatService = require("../services/kategori_tempatService");
const fasilitasService = require("../services/fasilitasService");
const { formatMessage, formatPaginatedMessage } = require("../utils/formatter");

const getAdminDashboard = async (req, res) => {
  try {
    const user = req.user; // User sudah diverifikasi oleh middleware
    res.status(200).json({
      message: "Selamat datang di dashboard admin",
      user,
    });
  } catch (error) {
    console.error("Error di adminController:", error.message);
    res.status(500).json(formatMessage("", null, 500));
  }
};

const manageUsers = async (req, res) => {
  try {
    // Logika untuk mengelola user
    res.status(200).json({ message: "Mengelola user berhasil" });
  } catch (error) {
    console.error("Error di adminController:", error.message);
    res.status(500).json(formatMessage("", null, 500));
  }
};

const getManajemenUser = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      code: 200,
      message: "Berhasil mengambil data manajemen user",
      data: users,
    });
  } catch (error) {
    console.error("Gagal mengambil data manajemen user:", error.message);
    res.status(500).json({
      code: 500,
      message: "Gagal mengambil data manajemen user",
    });
  }
};

const getAllKategoriTempat = async (req, res) => {
  try {
    const cari = req.query.cari || null;
    const sort = req.query.sort || "kategori_tempat_id.asc";
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const { data, pagination } =
      await kategoriTempatService.getAllKategoriTempat({
        cari,
        sort,
        limit,
        page,
      });

    res
      .status(200)
      .json(
        formatPaginatedMessage(
          "Berhasil mengambil data kategori tempat",
          data,
          pagination
        )
      );
  } catch (error) {
    console.error("Gagal mengambil kategori tempat:", error.message);
    res.status(500).json({
      code: 500,
      message: "Gagal mengambil data kategori tempat",
    });
  }
};

const updateKategoriTempat = async (req, res) => {
  try {
    const { kategori_tempat_id, nama, icon } = req.body;

    if (!kategori_tempat_id || !nama || !icon) {
      return res.status(400).json({
        code: 500,
        message: "Field 'kategori_tempat_id', 'nama', dan 'icon' wajib diisi",
      });
    }

    const updated = await kategoriTempatService.updateKategoriTempat(
      kategori_tempat_id,
      { nama, icon }
    );

    res.status(200).json({
      code: 200,
      message: "Kategori tempat berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    console.error("Gagal mengubah kategori tempat:", error.message);
    res.status(500).json({
      code: 500,
      message: "Gagal mengubah kategori tempat",
    });
  }
};

const hapusKategoriTempat = async (req, res) => {
  try {
    const { kategori_tempat_id } = req.body;

    if (!kategori_tempat_id) {
      return res.status(400).json({
        code: 500,
        message: "Field 'kategori_tempat_id' wajib diisi",
      });
    }

    const deleted = await kategoriTempatService.deleteKategoriTempat(
      kategori_tempat_id
    );

    res.status(200).json({
      code: 200,
      message: "Kategori tempat berhasil dihapus",
      data: deleted,
    });
  } catch (error) {
    console.error("Gagal menghapus kategori tempat:", error.message);
    res.status(500).json({
      code: 500,
      message: "Gagal menghapus kategori tempat",
    });
  }
};

const tambahKategoriTempat = async (req, res) => {
  try {
    const { nama, icon } = req.body;

    if (!nama) {
      return res.status(400).json({
        code: 500,
        message: "Field 'nama' wajib diisi",
      });
    }

    if (!icon) {
      return res.status(400).json({
        code: 500,
        message: "Field 'icon' wajib diisi",
      });
    }

    const result = await kategoriTempatService.tambahKategoriTempat({
      nama,
      icon,
    });

    res.status(201).json({
      code: 200,
      message: "Kategori tempat berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      code: 500,
      message: error.message || "Gagal menambahkan kategori tempat",
    });
  }
};

const getAllFasilitas = async (req, res) => {
  try {
    const cari = req.query.cari || null;
    const sort = req.query.sort || "fasilitas_id.asc";
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const { data, pagination } = await fasilitasService.getAllFasilitas({
      cari,
      sort,
      limit,
      page,
    });
    res
      .status(200)
      .json(
        formatPaginatedMessage(
          "Berhasil mengambil data fasilitas",
          data,
          pagination
        )
      );
  } catch (error) {
    console.error("Gagal mengambil data fasilitas:", error.message);
    res.status(500).json({
      code: 500,
      message: "Gagal mengambil data fasilitas",
    });
  }
};

const updateFasilitas = async (req, res) => {
  try {
    const { fasilitas_id, nama } = req.body;

    if (!fasilitas_id || !nama) {
      return res.status(400).json({
        code: 500,
        message: "Field 'fasilitas_id' dan 'nama' wajib diisi",
      });
    }

    const updated = await fasilitasService.ubah(fasilitas_id, { nama });

    res.status(200).json({
      code: 200,
      message: "Fasilitas berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    console.error("Gagal mengubah fasilitas:", error.message);
    res.status(500).json({
      code: 500,
      message: "Gagal mengubah fasilitas",
    });
  }
};

const hapusFasilitas = async (req, res) => {
  try {
    const { fasilitas_id } = req.body;

    if (!fasilitas_id) {
      return res.status(400).json({
        code: 500,
        message: "Field 'fasilitas_id' wajib diisi",
      });
    }

    const deleted = await fasilitasService.hapus(fasilitas_id);

    res.status(200).json({
      code: 200,
      message: "Fasilitas berhasil dihapus",
      data: deleted,
    });
  } catch (error) {
    console.error("Gagal menghapus fasilitas:", error.message);
    res.status(500).json({
      code: 500,
      message: "Gagal menghapus fasilitas",
    });
  }
};

const tambahFasilitas = async (req, res) => {
  try {
    const { nama, icon } = req.body;

    if (!nama || !icon) {
      return res.status(400).json({
        code: 500,
        message: "Field 'nama' dan 'icon' wajib diisi",
      });
    }

    const result = await fasilitasService.tambah({ nama, icon });
    res.status(201).json({
      code: 200,
      message: "Fasilitas berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      code: 500,
      message: error.message || "Gagal menambahkan fasilitas",
    });
  }
};

module.exports = {
  getAdminDashboard,
  manageUsers,
  getManajemenUser,
  getAllKategoriTempat,
  updateKategoriTempat,
  hapusKategoriTempat,
  tambahKategoriTempat,
  getAllFasilitas,
  updateFasilitas,
  hapusFasilitas,
  tambahFasilitas,
};
