const fotoRepository = require("../repositories/fotoRepository");

const addPhoto = async ({ tempat_id, user_id, foto }) => {
  try {
    const newPhoto = await fotoRepository.createPhoto({
      tempat_id,
      user_id,
      foto,
    });
    return newPhoto;
  } catch (error) {
    throw error;
  }
};

module.exports = { addPhoto };