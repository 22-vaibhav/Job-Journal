const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { sendEmail } = require("../services/emailService");
const welcomeEmail = require("../emails/welcomeEmail");

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

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            currentCompany,
            currentRole,
            experience,
            careerGoal,
        })

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
                email: user.email
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

module.exports = {
    registerUser,
    loginUser
}