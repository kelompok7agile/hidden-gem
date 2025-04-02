const express = require("express");
const { requestResetPassword, resetPassword } = require("../controllers/resetController.js");

const router = express.Router();
// route untuk meminta reset password
router.post("/request-reset-password", requestResetPassword);
// route untuk mereset atau mengganti password
router.post("/reset-password", resetPassword)

module.exports = router;