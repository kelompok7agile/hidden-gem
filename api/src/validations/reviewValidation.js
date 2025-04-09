const { body } = require('express-validator');

const reviewValidation = [
  body('tempat_id')
    .notEmpty()
    .withMessage('Tempat ID tidak boleh kosong')
    .isInt()
    .withMessage('Tempat ID harus berupa angka'),
  body('user_id')
    .notEmpty()
    .withMessage('User ID tidak boleh kosong')
    .isInt()
    .withMessage('User ID harus berupa angka'),
  body('rating')
    .notEmpty()
    .withMessage('Rating tidak boleh kosong')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating harus berupa angka antara 1 dan 5'),
  body('review')
    .notEmpty()
    .withMessage('Review tidak boleh kosong'),
];

module.exports = { reviewValidation };
