const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router();
const { reviewValidation } = require("../validations/reviewValidation");

router.post("/", reviewValidation, reviewController.addReview);
router.get("/:tempat_id", reviewController.getReviewsByTempatId);

module.exports = router;