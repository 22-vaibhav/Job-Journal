const express = require("express");

const router = express.Router();

const { sendEmail } = require("../services/emailService");

router.post("/test", async (req, res) => {

    try {
        const { email } = req.body;

        await sendEmail({
            to: email,
            subject: "Welcome to JobJournal 🎉",
            html: `
                <h2>Welcome to JobJournal</h2>

                <p>Your email service is working successfully.</p>

                <p>Happy Journaling 🚀</p>
            `,
        });

        res.json({
            success: true,
            message: "Email sent successfully.",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;