const dayjs = require("dayjs");

const User = require("../models/User");
const JournalEntry = require("../models/JournalEntry");

const { sendEmail } = require("./emailService");

const dailyReminderEmail = require("../emails/dailyReminderEmail");

const sendDailyReminders = async () => {

    try {
        const currentTime = dayjs().format("HH:mm");

        const users = await User.find({
            "notifications.dailyReminder.enabled": true,
            "notifications.dailyReminder.time": currentTime
        });

        console.log(`Found ${users.length} users for reminder`);

        const startOfDay = dayjs().startOf("day").toDate();
        const endOfDay = dayjs().endOf("day").toDate();

        for (const user of users) {
            const journal = await JournalEntry.findOne({
                user: user._id,
                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            });

            let hasDraft = false;

            if (!journal) {
                hasDraft = false;
            }
            else if (journal.status === "completed") {
                continue;
            }
            else {
                hasDraft = true;
            }

            try {
                await sendEmail({
                    to: user.email,
                    subject: "Complete Today's Journal 📒",
                    html: dailyReminderEmail({
                        name: user.name,
                        hasDraft,
                        frontendUrl: process.env.FRONTEND_URL
                    })
                });

                console.log(`Reminder sent to ${user.email}`);
            }
            catch (err) {
                console.error(`Failed for ${user.email}`, err.message);
            }
        }
    }
    catch (err) {
        console.error("Reminder Service Error:", err);
    }
};

module.exports = {
    sendDailyReminders
};