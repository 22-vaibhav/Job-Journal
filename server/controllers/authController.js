const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { sendEmail } = require("../services/emailService");
const welcomeEmail = require("../emails/welcomeEmail");

const JournalEntry = require("../models/JournalEntry");
const Document = require("../models/Document");
const cloudinary = require("../config/cloudinary");

const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            currentCompany,
            currentRole,
            experience,
            careerGoal,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User Already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        let profileImage = "";
        let profileImagePublicId = "";

        if (req.file) {
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

                uploadStream.end(req.file.buffer);
            });

            profileImage = result.secure_url;
            profileImagePublicId = result.public_id;
        }

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            currentCompany,
            currentRole,
            experience,
            careerGoal,
            profileImage,
            profileImagePublicId,
        });

        try {
            await sendEmail({
                to: user.email,
                subject: "Welcome to JobJournal 🎉",
                html: welcomeEmail(user.name),
            });
        } catch (err) {
            console.error("Welcome email failed:", err.message);
        }

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                currentCompany: user.currentCompany,
                currentRole: user.currentRole,
                experience: user.experience,
                careerGoal: user.careerGoal,
            }
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            }
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const deleteAccount = async (req, res) => {
    try {
        const { confirmation } = req.body;

        if (confirmation !== "DELETE") {
            return res.status(400).json({
                success: false,
                message: "Please type DELETE to confirm account deletion.",
            });
        }

        const userId = req.user.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }


        // Find all documents belonging to the user
        const documents = await Document.find({
            user: userId,
        });

        // Delete each document from Cloudinary
        for (const document of documents) {
            const result = await cloudinary.uploader.destroy(
                document.cloudinaryPublicId,
                {
                    resource_type: document.resourceType,
                    type: "authenticated",
                }
            );

            // Stop deletion if Cloudinary reports an unexpected result
            if (!["ok", "not found"].includes(result.result)) {
                throw new Error(
                    `Failed to delete document from Cloudinary: ${document.originalName}`
                );
            }
        }

        // Delete all journal entries belonging to the user
        await JournalEntry.deleteMany({
            user: userId,
        });

        
        // Delete all document records belonging to the user
        await Document.deleteMany({
            user: userId,
        });


        // Delete the user account
        if (user.profileImagePublicId) {
            await cloudinary.uploader.destroy(user.profileImagePublicId);
        }

        await User.findByIdAndDelete(user._id);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully.",
        });

    } catch (error) {
        console.error("Delete account error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete account.",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    deleteAccount,
}