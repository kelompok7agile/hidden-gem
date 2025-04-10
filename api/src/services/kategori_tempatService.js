const kategoriTempatRepository = require("../repositories/kategori_tempatRepository");

const getAllKategoriTempat = async () => {
  try {
    const kategori = await kategoriTempatRepository.getAll();

    if (!kategori || kategori.length === 0) {
      throw new Error("Tidak ada data kategori tempat yang ditemukan");
    }

    return kategori;
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
    tambahKategoriTempat
};
