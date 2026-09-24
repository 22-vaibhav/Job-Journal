const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const settingsController = require("../controllers/settingsController");

router.get("/profile", protect, settingsController.getProfile);
router.put("/profile", protect, settingsController.updateProfile);
router.get("/notifications", protect, settingsController.getNotifications);
router.put("/notifications", protect, settingsController.updateNotifications);
router.put("/change-password", protect, settingsController.changePassword);

module.exports = router;