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

const getReviewsByTempatId = async (tempat_id) => {
    const { data, error } = await supabase
        .from("rating")
        .select("user_id, rating, review")
        .eq("tempat_id", tempat_id);

    if (error) {
        console.error("Kesalahan saat mengambil data review:", error.message);
        throw error;
    }
    return data;
}

module.exports = {
    createReview,
    getReviewsByTempatId
}