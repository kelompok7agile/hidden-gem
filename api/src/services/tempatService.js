const tempatRepository = require("../repositories/tempatRepository.js");

const getAllTempat = async () => {
  try {
    const tempat = await tempatRepository.getAllTempat();

    if (!tempat || tempat.length === 0) {
      throw new Error("Tidak ada data tempat yang ditemukan");
    }

    return tempat;
  } catch (error) {
    throw error; 
  }
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

module.exports = {
  getAllTempat,
  getTempatById,
};
