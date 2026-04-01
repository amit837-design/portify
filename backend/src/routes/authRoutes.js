const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.get("/github", authController.githubLogin);
router.get("/github/callback", authController.githubCallback);
router.get("/me", protect, authController.getMe);
router.get("/logout", authController.logout);

module.exports = router;
