const express = require("express")

const router = express.Router()

const { registerUser, loginUser, deleteAccount } = require("../controllers/authController")
const upload = require("../middleware/uploadMiddleware");

const protect = require("../middleware/authMiddleware")

const User = require("../models/User")

router.post(
    "/register",
    upload.single("profileImage"),
    registerUser
)

router.post("/login", loginUser)

router.delete("/delete-account", protect, deleteAccount);

router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        res.json({
            success: true,
            message: "Welcome",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch profile"
        });
    }
})

module.exports = router