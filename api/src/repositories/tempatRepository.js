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
  
    const { data, error } = await supabase
      .from("tempat")
      .select("*")
      .eq("tempat_id", id)
      .single();
  
    if (error) {
      throw error;
    }
  
    return data;
  };
  
  module.exports = {
    getAllTempat,
    getTempatById,
  };
  