const supabase = require("../config/database");

const getAllTempat = async () => {
    const { data, error } = await supabase
      .from("tempat")
      .select("tempat_id, nama, deskripsi, alamat, link_gmaps, jam_operasional")
      .is("dihapus_pada", null);
  
    if (error) {
      throw error;
    }
    
  
    return data;
  };
  
const getTempatById = async (id) => {
  try{
    const { data: tempat, error: tempatError } = await supabase
      .from("tempat")
      .select("tempat_id, nama, deskripsi, alamat, link_gmaps, jam_operasional, list_kategori_tempat_id, list_fasilitas_id")
      .eq("tempat_id", id)
      .single();
    if (tempatError) {
      throw tempatError;
    }

    const kategoriIds = tempat.list_kategori_tempat_id ? tempat.list_kategori_tempat_id.split(",") : [];
    const { data: kategori, error: kategoriError } = await supabase
      .from("kategori_tempat")
      .select("nama")
      .in("kategori_tempat_id", kategoriIds);
    if (kategoriError) {
      throw kategoriError;
    }

    const fasilitasIds = tempat.list_fasilitas_id ? tempat.list_fasilitas_id.split(",") : [];
    const { data: fasilitas, error: fasilitasError } = await supabase
      .from("fasilitas")
      .select("nama")
      .in("fasilitas_id", fasilitasIds);
    if (fasilitasError) {
      throw fasilitasError;
    }

    return {
      ...tempat,
      kategori: kategori.map((item) => item.nama),
      fasilitas: fasilitas.map((item) => item.nama),
    };
    } catch (error) {
      console.error("Kesalahan saat mengambil detail tempat:", error.message);
      throw error;
  }
}
  
  module.exports = {
    getAllTempat,
    getTempatById,
  };
  