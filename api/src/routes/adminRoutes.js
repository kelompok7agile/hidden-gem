const express = require("express");
const adminController = require("../controllers/adminController");
const { authenticateUser, checkRole } = require("../middlewares/authMiddleware");
const router = express.Router();

// Endpoint khusus admin
router.get("/dashboard", authenticateUser, checkRole("01"), adminController.getAdminDashboard);
router.post("/manage-users", authenticateUser, checkRole("01"), adminController.manageUsers);

module.exports = router;