const express = require('express');
const router = express.Router();
const tempatController = require('../controllers/tempatController');
const { authenticateUser, checkRole } = require("../middlewares/authMiddleware");

router.get('/', authenticateUser, tempatController.getAllTempat);
router.get('/:id', authenticateUser, tempatController.getTempatById);

module.exports = router;
