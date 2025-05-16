const kategoriTempatRepository = require("../repositories/kategori_tempatRepository");

const getAllKategoriTempat = async ({
  cari = null,
  sort = "kategori_tempat_id.asc",
  page = 1,
  limit = 10,
}) => {
  try {
    const {
      data,
      total_data,
      halaman_sekarang,
      limit_per_halaman,
      total_halaman,
    } = await kategoriTempatRepository.getAllWithPagination({
      cari,
      sort,
      page,
      limit,
    });
    if (!data) {
      throw new Error("Gagal mengambil data kategori tempat");
    }

    return {
      data,
      pagination: {
        total_data,
        halaman_sekarang,
        limit_per_halaman,
        total_halaman,
      },
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

const tambahKategoriTempat = async ({ nama, icon }) => {
  const existing = await kategoriTempatRepository.findByNama(nama);
  if (existing) {
    throw new Error("Nama kategori sudah terdaftar");
  }

  const kategori = await kategoriTempatRepository.insert({ nama, icon });
  return kategori;
};

module.exports = {
  getAllKategoriTempat,
  updateKategoriTempat,
  deleteKategoriTempat,
  tambahKategoriTempat,
};
