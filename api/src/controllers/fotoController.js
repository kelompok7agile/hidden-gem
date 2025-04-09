const photoService = require("../services/photoService");
const supabase = require("../config/database");

const uploadPhoto = async (req, res) => {
  const { tempat_id, user_id, foto } = req.body;

  try {
    if (!tempat_id || !user_id || !foto) {
      return res
        .status(400)
        .json({ message: "Tempat ID, User ID, dan file foto wajib diisi" });
    }

    const buffer = Buffer.from(foto, "base64");
    const fileName = `${tempat_id}_${user_id}_${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from("foto_tempat")
      .upload(fileName, buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.error(
        "Kesalahan saat mengunggah foto ke Supabase:",
        error.message
      );
      return res.status(500).json({ message: "Gagal mengunggah foto" });
    }

    const { data: publicUrlData } = supabase.storage
      .from("foto_tempat")
      .getPublicUrl(fileName);
      
    const publicURL = publicUrlData.publicUrl;
    
    const newPhoto = await photoService.addPhoto({
      tempat_id,
      user_id,
      foto: publicURL,
    });

    res.status(201).json({
      message: "Foto berhasil diunggah",
      data: newPhoto,
    });
  } catch (error) {
    console.error("Kesalahan saat mengunggah foto:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan di server" });
  }
};

module.exports = { uploadPhoto };
