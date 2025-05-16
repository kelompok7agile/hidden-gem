const fasilitasRepository = require("../repositories/fasilitasRepository");

const getAll = async () => await fasilitasRepository.getAll();

const getAllFasilitas = async ({
  cari = null,
  sort = "fasilitas_id.asc",
  page = 1,
  limit = 10,
}) => {
  try {
    const {data, total_data, halaman_sekarang, limit_per_halaman, total_halaman} = await fasilitasRepository.getAllWithPagination({
      cari,
      sort,
      page,
      limit,
    });
    if (!data) {
      throw new Error("Gagal mengambil data kategori tempat");
    }
    console.log("data", data);
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
const tambah = async ({ nama, icon }) => {
  const existing = await fasilitasRepository.findByNama(nama);
  if (existing) throw new Error("Nama fasilitas sudah terdaftar");

  return await fasilitasRepository.insert({ nama, icon });
};

const ubah = async (id, data) => await fasilitasRepository.update(id, data);

const hapus = async (id) => await fasilitasRepository.remove(id);

module.exports = { getAllFasilitas, getAll, tambah, ubah, hapus };
