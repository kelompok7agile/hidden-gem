const express = require('express');
const userController = require('../controllers/userController');
const { validationResultMiddleware } = require('../middlewares/userMiddleware');
const { registerValidation } = require('../validations/userValidation');

const router = express.Router();

// Route untuk register user baru
router.post('/register', registerValidation, validationResultMiddleware, userController.register);

// Route untuk login user
router.post('/login', userController.login);

module.exports = router;