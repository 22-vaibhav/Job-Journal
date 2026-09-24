const dailyReminderEmail = ({ name, hasDraft, frontendUrl }) => {
    return `
    <!DOCTYPE html>
    <html>

    <body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:40px;">

        <div style="
            max-width:600px;
            margin:auto;
            background:white;
            border-radius:10px;
            padding:30px;
        ">

            <h2 style="color:#2563eb;">
                Daily Journal Reminder 📒
            </h2>

            <p>Hi <strong>${name}</strong>,</p>

            ${
                hasDraft
                    ? `
                    <p>
                        You have started today's journal, but it's still in
                        <strong>Draft</strong>.
                    </p>

                    <p>
                        Take a few minutes to complete it.
                    </p>
                    `
                    : `
                    <p>
                        You haven't written today's journal yet.
                    </p>

                    <p>
                        Record today's work while it's still fresh in your mind.
                    </p>
                    `
            }

            <div style="margin-top:30px;">
                <a
                    href="${frontendUrl}/journal"
                    style="
                        background:#2563eb;
                        color:white;
                        padding:12px 22px;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Continue Journal →
                </a>
            </div>

            <hr style="margin-top:35px;">

            <small style="color:gray;">
                Happy Journaling 🚀
            </small>

        </div>

    </body>

    </html>
    `;
};

module.exports = dailyReminderEmail;