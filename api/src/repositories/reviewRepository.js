const supabase = require("../config/database");

const createReview = async (tempat_id, user_id, rating, review) => {
    const { data, error } = await supabase
        .from("rating")
        .insert([{tempat_id: tempat_id, user_id: user_id, rating: rating, review: review}]);
    
    if (error) {
        console.error("Kesalahan saat menyimpan review:", error.message);
        throw error;
    }
    return data[0];
}

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