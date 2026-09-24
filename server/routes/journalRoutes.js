const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")
const { 
    getCalendar, 
    getToday, 
    saveDraft, 
    submitToday, 
    openJournal, 
    createJournal, 
    getJournalById,
    searchJournalEntries,
    getJournalStatisticsController,
} = require("../controllers/journalController")

router.get("/today", protect, getToday);

router.get("/calendar", protect, getCalendar);

router.get("/search", protect, searchJournalEntries);

router.get("/stats", protect, getJournalStatisticsController);

router.post("/open", protect, openJournal);

router.post("/", protect, createJournal);

router.get("/:journalId", protect, getJournalById);

router.put("/:id", protect, saveDraft);

router.put("/:id/submit", protect, submitToday);

module.exports = router