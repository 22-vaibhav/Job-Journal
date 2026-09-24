const welcomeEmail = (name) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Welcome to JobJournal</title>
    </head>

    <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">

        <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:10px;">

            <h2 style="color:#2563eb;">
                Welcome to JobJournal 🎉
            </h2>

            <p>Hello <strong>${name}</strong>,</p>

            <p>
                Thank you for joining <strong>JobJournal</strong>.
            </p>

            <p>
                Your account has been created successfully.
            </p>

            <p>
                We hope JobJournal helps you build a consistent habit of documenting
                your daily work and tracking your professional growth.
            </p>

            <hr>

            <p style="font-size:13px;color:gray;">
                Happy Journaling 🚀
            </p>

        </div>

    </body>
    </html>
    `;
};

module.exports = welcomeEmail;