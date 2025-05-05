const express = require("express");
const { requestResetPassword, resetPassword, checkToken } = require("../controllers/resetController.js");

const router = express.Router();
router.post("/request-reset-password", requestResetPassword);
router.get("/reset-password", checkToken);
router.post("/reset-password", resetPassword)

module.exports = router;