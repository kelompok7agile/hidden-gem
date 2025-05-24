const supabase = require("../config/database");

const createReview = async (tempat_id, user_id, rating, review) => {

    if (!tempat_id || !user_id || !rating || !review) {
        throw new Error("Semua field harus diisi");
    }

    const { data, error } = await supabase
        .from("rating")
        .insert([{ tempat_id, user_id, rating, review }]);

    if (error) {
        console.error("Kesalahan saat menyimpan review:", error.message);
        throw error;
    }
};

const getReviewsByTempatId = async (tempat_id, limit = 10, offset = 0) => {
    const { data, count,  error } = await supabase
      .from("rating")
      .select("user_id, rating, review",       { count: "exact" })
      .eq("tempat_id", tempat_id)
      .range(offset, offset + limit - 1);
  
    if (error) {
      console.error("Kesalahan saat mengambil data review:", error.message);
      throw error;
    }
  
    return {
        data: data,
        count
    }
  };
  

module.exports = {
    createReview,
    getReviewsByTempatId
}