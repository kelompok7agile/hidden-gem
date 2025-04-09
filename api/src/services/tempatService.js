const tempatRepository = require("../repositories/tempatRepository.js");
const fs = require("fs-extra");
const path = require("path");

const getAllTempat = async (filters) => {
  const { nama, kategori } = filters;

  let kategoriArray = [];
  if (kategori) {
    try {
      kategoriArray = JSON.parse(kategori);
      if (!Array.isArray(kategoriArray)) {
        throw new Error("Kategori harus berupa array");
      }
    } catch (e) {
      throw new Error("Format kategori tidak valid (harus JSON array)");
    }
  }

  const tempat = await tempatRepository.getAllTempat({
    nama,
    kategori: kategoriArray,
  });

  if (!tempat || tempat.length === 0) {
    throw new Error("Tidak ada data tempat yang ditemukan");
  }

  return tempat;
};


const getTempatById = async (id) => {
  try {
    const tempat = await tempatRepository.getTempatById(id);

    if (!tempat) {
      throw new Error("Tidak ada data tempat yang ditemukan");
    }

    return tempat;
  } catch (error) {
    throw error; 
  }
};

const compareTempat = async (id1, id2) => {
  const [tempat1, tempat2] = await Promise.all([
    tempatRepository.getTempatById(id1),
    tempatRepository.getTempatById(id2)
  ]);

  if (!tempat1 || !tempat2) {
    throw new Error("Salah satu tempat tidak ditemukan");
  }

  return {
    tempat_1: tempat1,
    tempat_2: tempat2
  };
};

const createTempat = async (body, files, user_id) => {

  const {
    nama,
    deskripsi,
    alamat,
    jam_operasional,
    link_gmaps,
    list_kategori_tempat_id
  } = body;

  if (!nama || !jam_operasional || !alamat) {
    throw new Error("Nama, jam operasional, dan alamat wajib diisi");
  }

  const tempat = await tempatRepository.insertTempat({
    nama,
    deskripsi,
    alamat,
    link_gmaps,
    jam_operasional: JSON.parse(jam_operasional),
    list_kategori_tempat_id
  });

  console.log(files);

  const tempat_id = tempat.tempat_id;

  if (files && files.length > 0) {
    const fotoPromises = files.map((file) => {
      return tempatRepository.insertFotoTempat({
        tempat_id,
        user_id,
        foto: file.filename,
        dibuat_pada: new Date(),
        dibuat_oleh_user_id: user_id
      });
    });

    await Promise.all(fotoPromises);
  }

  return tempat;
};

const updateTempat = async (tempat_id, body, files, user_id) => {
  const {
    nama,
    alamat,
    deskripsi,
    link_gmaps,
    jam_operasional,
    list_kategori_tempat_id
  } = body;

  const parsedJam = jam_operasional ? JSON.parse(jam_operasional) : undefined;

  const updatedTempat = await tempatRepository.updateTempat(tempat_id, {
    ...(nama && { nama }),
    ...(alamat && { alamat }),
    ...(deskripsi && { deskripsi }),
    ...(link_gmaps && { link_gmaps }),
    ...(jam_operasional && { jam_operasional: parsedJam }),
    ...(list_kategori_tempat_id && { list_kategori_tempat_id }),
    diubah_pada: new Date(),
    diubah_oleh_user_id: user_id,
  });

  const fotoLama = await tempatRepository.getFotoTempatByTempatId(tempat_id);

  for (const foto of fotoLama) {
    await tempatRepository.deleteFotoTempat(foto.foto_tempat_id);

    const filePath = path.join(__dirname, "../../uploads/foto_tempat", foto.foto);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Gagal hapus file:", foto.foto);
    });
  }

  if (files && files.length > 0) {
    const fotoPromises = files.map((file) => {
      return tempatRepository.insertFotoTempat({
        tempat_id,
        user_id,
        foto: file.filename,
        dibuat_pada: new Date(),
        dibuat_oleh_user_id: user_id
      });
    });

    await Promise.all(fotoPromises);
  }

  return updatedTempat;
};

const hapusTempat = async (tempat_id, user_id) => {
  const result = await tempatRepository.softDeleteTempat(tempat_id, {
    dihapus_pada: new Date(),
    dihapus_oleh_user_id: user_id
  });

  return result;
};


module.exports = {
  getAllTempat,
  getTempatById,
  compareTempat,
  createTempat,
  updateTempat,
  hapusTempat
};
