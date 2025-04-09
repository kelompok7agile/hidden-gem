const reviewService = require('../services/reviewService.js');
const { formatMessage } = require('../utils/formatter.js');

const addReview = async (req, res) => {
    const { tempat_id, user_id, rating, review } = req.body;

    try {
        if(!tempat_id || !user_id || !rating || !review) {
            return res.status(400).json(formatMessage("Semua field harus diisi"));
        }
        if(rating < 1 || rating > 5) {
            return res.status(400).json(formatMessage("Rating harus antara 1 dan 5"));
        }
        const newReview = await reviewService.addReview(tempat_id, user_id, rating, review);
        res.status(201).json(formatMessage("Review berhasil ditambahkan", newReview));
    } catch (error) {
        console.error("Kesalahan saat menambahkan review:", error.message);
        return res.status(500).json(formatMessage("Terjadi kesalahan di server"));
    }
}

const getReviewsByTempatId = async (req, res) => {
    const { tempat_id } = req.params;

    try {
        const reviews = await reviewService.getReviewsByTempatId(tempat_id);
        res.status(200).json(formatMessage("Data review berhasil diambil", reviews));
    } catch (error){
        console.error("Kesalahan saat mengambil data review:", error.message);
        return res.status(500).json(formatMessage("Terjadi kesalahan di server"));
    }
}

module.exports = {
    addReview,
    getReviewsByTempatId
};