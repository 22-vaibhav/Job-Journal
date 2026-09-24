const cron = require("node-cron");

const { sendDailyReminders } = require("../services/reminderService");

cron.schedule("30 20 * * *", async () => {

    console.log("Running Daily Reminder Cron...");

    await sendDailyReminders();

});