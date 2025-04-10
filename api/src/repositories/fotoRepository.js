const supabase = require("../config/database");

const createPhoto = async ({ tempat_id, user_id, foto }) => {
  const { data, error } = await supabase
    .from("foto_tempat")
    .insert([
      {
        tempat_id,
        user_id,
        foto,
        dibuat_pada: new Date(),
        dibuat_oleh_user_id: user_id,
      },
    ]);

  if (error) {
    console.error("Kesalahan saat menyimpan foto:", error.message);
    throw error;
  }

  return data[0];
};

module.exports = { createPhoto };