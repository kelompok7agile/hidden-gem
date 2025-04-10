const reviewRepository = require('../repositories/reviewRepository.js');

const addReview = async (tempat_id, user_id, rating, review) => {
    try {
        const newReview = await reviewRepository.createReview(tempat_id, user_id, rating, review);
        return newReview;
    } catch (error) {
        console.error("Kesalahan saat menambahkan review:", error.message);
        throw error;
    }
};

const getReviewsByTempatId = async (tempat_id) => {
    try {
        const reviews = await reviewRepository.getReviewsByTempatId(tempat_id);
        return reviews;
    } catch (error) {
        console.error("Kesalahan saat mengambil data review:", error.message);
        throw error;
    }
}

module.exports = {
    addReview,
    getReviewsByTempatId
};