
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const connectDB = require("./config/db")

dotenv.config()
connectDB()

const authRoutes = require("./routes/authRoutes")
const journalRoutes = require("./routes/journalRoutes");
const userRoutes = require("./routes/userRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const emailRoutes = require("./routes/emailRoutes");

require("./cron/dailyReminderCron");

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/journal", journalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json({
        message: "ResumeLog AI Backend running"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})