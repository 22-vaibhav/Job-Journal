const {
    getProfile,
    updateProfile,
} = require("../services/userService");

const getUserProfile = async (req, res, next) => {
    try {
        const user = await getProfile(req.user.userId);

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully.",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const updateUserProfile = async (req, res, next) => {
    try {
        const user = await updateProfile(
            req.user.userId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
};