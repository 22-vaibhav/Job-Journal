
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        originalName: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            default: "Other",
            enum: [
                "Resume",
                "Cover Letter",
                "Certificate",
                "Offer Letter",
                "Experience Letter",
                "Identity Document",
                "Other",
            ],
        },

        cloudinaryUrl: {
            type: String,
            required: true,
        },

        cloudinaryPublicId: {
            type: String,
            required: true,
        },

        resourceType: {
            type: String,
            required: true,
        },

        format: {
            type: String,
            default: "",
        },

        size: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Document", documentSchema);
