const reviewService = require('../services/reviewService.js');
const { formatMessage } = require('../utils/formatter.js');

const addReview = async (req, res) => {
    const { tempat_id, user_id, rating, review } = req.body;

    try {
        const newReview = await reviewService.addReview(tempat_id, user_id, rating, review);
        res.status(200).json(formatMessage("Review berhasil ditambahkan", newReview));
    } catch (error) {
        console.error("Kesalahan saat menambahkan review:", error.message);
        return res.status(500).json(formatMessage(error.message));
    }
};

const getReviewsByTempatId = async (req, res) => {
    const { tempat_id } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    try {
        const reviews = await reviewService.getReviewsByTempatId(tempat_id, parseInt(limit), parseInt(offset));
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
