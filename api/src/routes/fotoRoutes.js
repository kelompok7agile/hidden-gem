const express = require("express");
const fotoController = require("../controllers/fotoController");
const router = express.Router();

router.post("/", fotoController.uploadFoto);

module.exports = router;