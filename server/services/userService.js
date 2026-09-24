const User = require("../models/User");

const getProfile = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found.");
    }

    return user;
};

const updateProfile = async (userId, data) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;

    user.currentCompany =
        data.currentCompany ?? user.currentCompany;

    user.currentRole =
        data.currentRole ?? user.currentRole;

    user.experience =
        data.experience ?? user.experience;

    user.careerGoal =
        data.careerGoal ?? user.careerGoal;

    await user.save();

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        currentCompany: user.currentCompany,
        currentRole: user.currentRole,
        experience: user.experience,
        careerGoal: user.careerGoal,
        createdAt: user.createdAt,
    };
};

module.exports = {
    getProfile,
    updateProfile,
};