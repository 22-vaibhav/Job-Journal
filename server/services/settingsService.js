const bcrypt = require("bcrypt");
const User = require("../models/User");

// const getSettings = async (userId) => {
//     const user = await User.findById(userId).select(
//         "-password -__v"
//     );

//     if (!user) {
//         throw new Error("User not found");
//     }

//     return user;
// };

const updateProfile = async (userId, profileData) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.name = profileData.name;
    user.currentCompany = profileData.currentCompany;
    user.currentRole = profileData.currentRole;
    user.experience = profileData.experience;
    user.careerGoal = profileData.careerGoal;

    await user.save();

    return user;
};

const getProfile = async (userId) => {
    const user = await User.findById(userId).select(
        "name email currentCompany currentRole experience careerGoal"
    );

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

const getNotifications = async (userId) => {
    const user = await User.findById(userId).select("notifications");

    if (!user) {
        throw new Error("User not found");
    }

    return user.notifications;
};

const updateNotifications = async (userId, notifications) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.notifications = notifications;

    // console.log("Incoming notifications:", notifications);

    await user.save();

    return user.notifications;
};

const changePassword = async (userId, passwordData) => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("All password fields are required.");
    }

    if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match.");
    }

    if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isMatch) {
        throw new Error("Current password is incorrect.");
    }

    const samePassword = await bcrypt.compare(
        newPassword,
        user.password
    );

    if (samePassword) {
        throw new Error(
            "New password cannot be the same as the current password."
        );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return true;
};

module.exports = {
    // getSettings,
    updateProfile,
    getProfile,
    getNotifications,
    updateNotifications,
    changePassword,
};