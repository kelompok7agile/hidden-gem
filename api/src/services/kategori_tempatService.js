const kategoriTempatRepository = require("../repositories/kategori_tempatRepository");

const getAllKategoriTempat = async ({
  page = 1,
  limit = 10,
  cari = null,
  sort = "kategori_tempat_id.asc",
}) => {
  try {
    const offset = (page - 1) * limit;

    // Ambil data dengan paginasi
    const data = await kategoriTempatRepository.getAll({
      limit,
      offset,
      cari,
      sort,
    });
    if (!data) {
      throw new Error("Gagal mengambil data kategori tempat");
    }

    const total_data = await kategoriTempatRepository.countAll();

    return {
      data,
      total_data,
    };
  } catch (error) {
    throw error;
  }
};

const updateKategoriTempat = async (id, updateData) => {
  const kategori = await kategoriTempatRepository.update(id, updateData);
  return kategori;
};

const deleteKategoriTempat = async (id) => {
  const { data, error } = await kategoriTempatRepository.deleteData(id);

  if (error) {
    throw new Error("Gagal menghapus kategori tempat");
  }

  return data;
};

const tambahKategoriTempat = async ({ nama }) => {
  const existing = await kategoriTempatRepository.findByNama(nama);
  if (existing) {
    throw new Error("Nama kategori sudah terdaftar");
  }

  const kategori = await kategoriTempatRepository.insert({ nama });
  return kategori;
};

module.exports = {
  getAllKategoriTempat,
  updateKategoriTempat,
  deleteKategoriTempat,
  tambahKategoriTempat,
};
