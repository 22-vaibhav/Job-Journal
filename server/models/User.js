const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        currentCompany: {
            type: String,
            default: "",
        },

        currentRole: {
            type: String,
            default: "",
        },

        experience: {
            type: Number,
            default: 0,
        },

        careerGoal: {
            type: String,
            default: "",
        },

        emailVerified: {
            type: Boolean,
            default: false,
        },

        googleId: {
            type: String,
            default: null,
        },

        profileImage: {
            type: String,
            default: "",
        },

        notifications: {
            dailyReminder: {
                enabled: {
                    type: Boolean,
                    default: true,
                },
                time: {
                    type: String,
                    default: "20:00",
                },
            },

            weeklyReport: {
                enabled: {
                    type: Boolean,
                    default: true,
                },
                day: {
                    type: String,
                    default: "Sunday",
                },
                time: {
                    type: String,
                    default: "18:00",
                },
            },

            monthlyReport: {
                enabled: {
                    type: Boolean,
                    default: true,
                },
                day: {
                    type: Number,
                    default: 1,
                },
                time: {
                    type: String,
                    default: "09:00",
                },
            },
        },

        appearance: {
            theme: {
                type: String,
                enum: ["light", "dark", "system"],
                default: "system",
            },
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema)