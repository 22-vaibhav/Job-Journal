const settingsService = require("../services/settingsService");

const getProfile = async (req, res) => {
    try {
        const profile = await settingsService.getProfile(req.user.userId);

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const updatedUser = await settingsService.updateProfile(
            req.user.userId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getNotifications = async (req, res) => {
    try {
        const notifications =
            await settingsService.getNotifications(req.user.userId);

        res.status(200).json({
            success: true,
            data: notifications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateNotifications = async (req, res) => {
    try {
        // console.log("Request body:", req.body);
        const notifications =
            await settingsService.updateNotifications(
                req.user.userId,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Notification preferences updated",
            data: notifications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const changePassword = async (req, res) => {
    try {
        await settingsService.changePassword(
            req.user.userId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getNotifications,
    updateNotifications,
    changePassword,
};