const reviewRepository = require("../repositories/reviewRepository.js");

const addReview = async (tempat_id, user_id, rating, review) => {
  try {
    const newReview = await reviewRepository.createReview(
      tempat_id,
      user_id,
      rating,
      review
    );
    return newReview;
  } catch (error) {
    console.error("Kesalahan saat menambahkan review:", error.message);
    throw error;
  }
};

const getReviewsByTempatId = async (tempat_id, limit, offset) => {
  try {
    const parsedLimit = parseInt(limit);
    const parsedOffset = parseInt(offset);

    const offsetData = parsedOffset * parsedLimit;

    const reviews = await reviewRepository.getReviewsByTempatId(
      tempat_id,
      parsedLimit,
      offsetData
    );

    const total_page = Math.ceil(reviews.count / parsedLimit);

    if (parsedOffset > total_page) {
      return {
        data: [],
        total_data: reviews.count,
        total_page,
        halaman_sekarang: parsedOffset,
      };
    }

    return {
      data: reviews.data,
      total_data: reviews.data.total_data,
      total_page,
      halaman_sekarang: parsedOffset + 1,
    };
  } catch (error) {
    console.error("Kesalahan saat mengambil data review:", error.message);
    throw error;
  }
};

module.exports = {
  addReview,
  getReviewsByTempatId,
};
