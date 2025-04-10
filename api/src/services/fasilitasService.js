const fasilitasRepository = require("../repositories/fasilitasRepository");

const getAll = async () => await fasilitasRepository.getAll();

const tambah = async ({ nama }) => {
  const existing = await fasilitasRepository.findByNama(nama);
  if (existing) throw new Error("Nama fasilitas sudah terdaftar");

  return await fasilitasRepository.insert({ nama });
};

const ubah = async (id, data) => await fasilitasRepository.update(id, data);

const hapus = async (id) => await fasilitasRepository.remove(id);

module.exports = { getAll, tambah, ubah, hapus };
