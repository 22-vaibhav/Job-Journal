const React = require("react");

const emailService = require("../services/email/emailService");
const WelcomeEmail = require("../emails/templates/WelcomeEmail");

exports.sendTestEmail = async (req, res) => {
    try {

        const { email, name } = req.body;

        const template = React.createElement(WelcomeEmail, {
            name,
        });

        const response = await emailService.sendEmail({
            to: email,
            subject: "Welcome to JobJournal 🎉",
            template,
        });

        return res.status(200).json({
            success: true,
            message: "Email sent successfully.",
            data: response,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to send email.",
            error: error.message,
        });

    }
};