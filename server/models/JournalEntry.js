const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        projects: [
            {
                type: String,
                trim: true,
            }
        ],

        tasksCompleted: [
            {
                type: String,
            },
        ],

        meetings: [
            {
                type: String,
            },
        ],

        challenges: [
            {
                type: String,
            },
        ],

        solutions: [
            {
                type: String,
            },
        ],

        learnings: [
            {
                type: String,
            },
        ],

        achievements: [
            {
                type: String,
            },
        ],

        notes: {
            type: String,
            default: "",
        },

        aiSummary: {
            type: String,
        },

        status: {
            type: String,
            enum: ["draft", "completed", "blank"],
            default: "draft",
        },

        submittedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

journalEntrySchema.index(
    {
        user: 1,
        date: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model("JournalEntry", journalEntrySchema);