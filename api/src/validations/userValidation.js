const { body } = require('express-validator');

const registerValidation = [
  body('nama')
    .notEmpty()
    .withMessage('Nama tidak boleh kosong'),
  body('email')
    .isEmail()
    .withMessage('Email tidak valid'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password harus memiliki minimal 6 karakter'),
  body('no_telepon')
    .notEmpty()
    .withMessage('Nomor telepon tidak boleh kosong'),
];

module.exports = { registerValidation };
