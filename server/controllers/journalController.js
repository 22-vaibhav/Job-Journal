const { getStartAndEndOfMonth } = require("../utils/dateUtils")
const {
    getCalendarEntries,
    getTodayJournal,
    updateDraft,
    submitJournal,
    openJournal: openJournalService,
    getJournalById: getJournalByIdService,
    createJournal: createJournalService,
    searchJournals,
    getJournalStatistics,
} = require("../services/journalService")
const { toJournalResponse } = require("../mappers/journalMapper")

const getCalendar = async (req, res) => {
    try {
        const { year, month } = req.query

        if (!year || !month) {
            return res.status(400).json({
                success: false,
                message: "Year and month are required",
            })
        }

        const { startDate, endDate } = getStartAndEndOfMonth(
            Number(year),
            Number(month)
        )

        const journals = await getCalendarEntries(
            req.user.userId,
            startDate,
            endDate
        )

        res.status(200).json({
            success: true,
            message: "Calendar fetched successfully",
            data: journals,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getToday = async (req, res) => {
    try {
        const journal = await getTodayJournal(
            req.user.userId
        )

        res.status(200).json({
            success: true,
            message: "Today's journal fetched successfully",
            data: toJournalResponse(journal)
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const saveDraft = async (req, res) => {
    try {
        const allowedFields = [
            "projects",
            "tasksCompleted",
            "meetings",
            "challenges",
            "solutions",
            "learnings",
            "achievements",
            "notes",
        ];

        const updateData = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        const journal = await updateDraft(
            req.params.id,
            req.user.userId,
            updateData
        );

        res.status(200).json({
            success: true,
            message: "Draft saved successfully.",
            data: toJournalResponse(journal),
        });
    } catch (error) {
        const statusCode =
            error.message === "Journal not found." ? 404 : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message,
        });
    }
}

const submitToday = async (req, res) => {
    try {
        const journal = await submitJournal(
            req.params.id,
            req.user.userId
        )

        res.status(200).json({
            success: true,
            message: "Journal submitted successfully.",
            data: toJournalResponse(journal),
        })
    } catch (error) {
        const statusCode = error.message === "Journal not found." ? 404 : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message,
        })
    }
}

const openJournal = async (req, res, next) => {
    try {
        const { date } = req.body;

        const result = await openJournalService(
            req.user.userId,
            date
        );

        res.status(200).json({
            success: true,
            message: result.exists
                ? "Journal found successfully."
                : "Temporary journal created.",
            data: result.journal,
            exists: result.exists,
        });

    } catch (error) {
        next(error);
    }
};

const getJournalById = async (req, res, next) => {
    try {
        const journal = await getJournalByIdService(
            req.params.journalId,
            req.user.userId
        );

        res.status(200).json({
            success: true,
            data: journal,
        });
    } catch (error) {
        next(error);
    }
};

const createJournal = async (req, res, next) => {
    try {
        const journal = await createJournalService(
            req.user.userId,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Journal created successfully.",
            data: journal,
        });
    } catch (error) {
        next(error);
    }
};

const searchJournalEntries = async (req, res, next) => {
    try {
        const journals = await searchJournals(
            req.user.userId,
            req.query
        );

        res.status(200).json({
            success: true,
            message: "Journals fetched successfully.",
            data: journals,
        });
    } catch (error) {
        next(error);
    }
};

const getJournalStatisticsController = async (req, res, next) => {
    try {
        const statistics = await getJournalStatistics(
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Journal statistics fetched successfully.",
            data: statistics,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCalendar,
    getToday,
    saveDraft,
    submitToday,
    openJournal,
    getJournalById,
    createJournal,
    searchJournalEntries,
    getJournalStatisticsController,
};