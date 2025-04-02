const tempatService = require("../services/tempatService");
const { formatMessage, formatPaginatedMessage } = require("../utils/formatter");

const getAllTempat = async (req, res) => {
  try {
    const tempat = await tempatService.getAllTempat();

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

module.exports = {
  getAllTempat,
  getTempatById,
};
