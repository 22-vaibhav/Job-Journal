const express = require("express");

const {
    getUserProfile,
    updateUserProfile,
    uploadUserProfileImage,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

router.post(
    "/profile/image",
    protect,
    upload.single("profileImage"),
    uploadUserProfileImage
);

module.exports = router;