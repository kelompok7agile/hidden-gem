const validateTempat = (req, res, next) => {
  const { nama, alamat, jam_operasional, list_kategori_tempat_id } = req.body;

  if (!nama || !alamat || !jam_operasional || !list_kategori_tempat_id) {
    return res.status(400).json({
      success: false,
      message:
        "Field nama, alamat, jam_operasional, dan list_kategori_tempat_id wajib diisi",
    });
  }

  try {
    const jam = JSON.parse(jam_operasional);
    if (typeof jam !== "object" || Array.isArray(jam)) {
      throw new Error();
    }
  } catch {
    return res.status(400).json({
      success: false,
      message: "Format jam_operasional harus berupa JSON string valid",
    });
  }

  next();
};

module.exports = validateTempat;
