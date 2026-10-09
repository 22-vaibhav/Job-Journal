const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

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

const uploadProfileImage = async (userId, fileBuffer) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "jobjournal/profile-images",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(fileBuffer);
    });

    user.profileImage = result.secure_url;
    user.profileImagePublicId = result.public_id;

    await user.save();

    return user;
};

module.exports = {
    getProfile,
    updateProfile,
    uploadProfileImage,
};