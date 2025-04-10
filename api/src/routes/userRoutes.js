const express = require("express");
const userController = require("../controllers/userController");
const { validationResultMiddleware } = require("../middlewares/userMiddleware");
const { registerValidation } = require("../validations/userValidation");
const {
  authenticateUser,
  checkRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validationResultMiddleware,
  userController.register
);

router.post("/login", userController.login);

const upload = require("../middlewares/upload");

router.patch(
  "/:id/profile",
  authenticateUser,
  upload.single("profile_picture"),
  userController.updateProfile
);

module.exports = router;
