const JournalEntry = require("../models/JournalEntry")
const { getToday } = require("../utils/dateUtils")
const { toJournalResponse } = require("../mappers/journalMapper")

const getCalendarEntries = async (userId, startDate, endDate) => {
    return await JournalEntry.find({
        user: userId,
        date: {
            $gte: startDate,
            $lte: endDate,
        },
    }).select("date status")
}

const getTodayJournal = async (userId) => {
    const today = getToday()

    let journal = await JournalEntry.findOne({
        user: userId,
        date: today
    })

    if (!journal) {
        journal = await JournalEntry.create({
            user: userId,
            date: today,
            status: "draft"
        })
    }
    return journal
}

const updateDraft = async (journalId, userId, updateData) => {
    const journal = await JournalEntry.findOne({
        _id: journalId,
        user: userId,
    })

    if (!journal) {
        throw new Error("Journal not found.")
    }

    if (journal.status === "completed") {
        throw new Error("Completed journals cannot be edited.")
    }

    Object.assign(journal, updateData)

    journal.status = "draft"

    await journal.save()

    return journal
}

const submitJournal = async (journalId, userId) => {
    const journal = await JournalEntry.findOne({
        _id: journalId,
        user: userId,
    })

    if (!journal) {
        throw new Error("Journal not found.")
    }

    if (journal.status === "completed") {
        throw new Error("Journal already submitted.")
    }

    journal.status = "completed"

    journal.submittedAt = new Date()

    // TODO: Generate AI Summary

    await journal.save()

    return journal
};

const openJournal = async (userId, date) => {
    const [year, month, day] = date
        .split("-")
        .map(Number);

    const selectedDate = new Date(
        year,
        month - 1,
        day
    );

    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
        throw new Error("Future journals cannot be opened.");
    }

    const journal = await JournalEntry.findOne({
        user: userId,
        date: selectedDate,
    });

    // Existing journal found
    if (journal) {
        return {
            journal: toJournalResponse(journal),
            exists: true,
        };
    }

    // Today's journal should always exist
    if (selectedDate.getTime() === today.getTime()) {
        const newJournal = await JournalEntry.create({
            user: userId,
            date: selectedDate,
            status: "draft",
        });

        return {
            journal: toJournalResponse(newJournal),
            exists: true,
        };
    }

    // Missed day -> return temporary object only
    return {
        journal: {
            id: null,
            date: selectedDate,
            projects: [],
            tasksCompleted: [],
            meetings: [],
            challenges: [],
            solutions: [],
            learnings: [],
            achievements: [],
            notes: "",
            status: "missed",
            isNew: true,
        },
        exists: false,
    };
};

const getJournalById = async (journalId, userId) => {
    const journal = await JournalEntry.findOne({
        _id: journalId,
        user: userId,
    });

    if (!journal) {
        throw new Error("Journal not found.");
    }
    return toJournalResponse(journal);
};

const createJournal = async (userId, journalData) => {

    const {
        date,
        projects = [],
        tasksCompleted = [],
        meetings = [],
        challenges = [],
        solutions = [],
        learnings = [],
        achievements = [],
        notes = "",
        status = "draft",
    } = journalData;

    const journalStatus =
        status === "missed"
            ? "draft"
            : status;

    const selectedDate = new Date(date);

    selectedDate.setHours(0, 0, 0, 0);

    // Prevent duplicate journals
    const existingJournal = await JournalEntry.findOne({
        user: userId,
        date: selectedDate,
    });

    if (existingJournal) {
        throw new Error("Journal already exists for this date.");
    }

    const journal = await JournalEntry.create({
        user: userId,
        date: selectedDate,
        projects,
        tasksCompleted,
        meetings,
        challenges,
        solutions,
        learnings,
        achievements,
        notes,
        status: journalStatus,
    });


    return toJournalResponse(journal);
};

const searchJournals = async (userId, query) => {

    const {
        keyword,
        status,
        month,
        year,
    } = query;

    const filter = {
        user: userId,
    };

    // Status Filter
    if (status && status !== "all") {
        filter.status = status;
    }

    // Month & Year Filter
    // Month & Year Filter
    if (month || year) {

        let startDate;
        let endDate;

        if (month && year) {

            startDate = new Date(
                Number(year),
                Number(month) - 1,
                1
            );

            endDate = new Date(
                Number(year),
                Number(month),
                1
            );

        } else if (year) {

            startDate = new Date(
                Number(year),
                0,
                1
            );

            endDate = new Date(
                Number(year) + 1,
                0,
                1
            );

        } else {

            // Month selected but no year
            const currentYear = new Date().getFullYear();

            startDate = new Date(
                currentYear,
                Number(month) - 1,
                1
            );

            endDate = new Date(
                currentYear,
                Number(month),
                1
            );

        }

        filter.date = {
            $gte: startDate,
            $lt: endDate,
        };

    }

    // Keyword Search
    if (keyword && keyword.trim() !== "") {

        const regex = new RegExp(keyword, "i");

        filter.$or = [

            { projects: regex },

            { tasksCompleted: regex },

            { meetings: regex },

            { challenges: regex },

            { solutions: regex },

            { learnings: regex },

            { achievements: regex },

            { notes: regex },

        ];

    }

    // console.log("Search Filter:");
    // console.log(filter);

    const journals = await JournalEntry
        .find(filter)
        .sort({
            date: -1,
        });

    // console.log("Found:", journals.length);

    return journals;
};

// Helper function for streak
const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
};

const calculateCurrentStreak = (journals) => {
    const completedDates = new Set(
        journals
            .filter(journal => journal.status === "completed")
            .map(journal => {

                const date = new Date(journal.date);

                date.setHours(0, 0, 0, 0);

                return date.getTime();
            })
    );

    let streak = 0;

    const current = new Date();

    current.setHours(0, 0, 0, 0);

    // If today isn't completed, begin checking from yesterday.
    if (!completedDates.has(current.getTime())) {
        current.setDate(current.getDate() - 1);
    }

    while (true) {
        // Skip weekends completely.
        while (isWeekend(current)) {
            current.setDate(current.getDate() - 1);
        }

        if (completedDates.has(current.getTime())) {

            streak++;

            current.setDate(current.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
};

const calculateLongestStreak = (journals) => {
    const completedDates = new Set(
        journals
            .filter(journal => journal.status === "completed")
            .map(journal => {

                const date = new Date(journal.date);

                date.setHours(0, 0, 0, 0);

                return date.getTime();
            })
    );

    const dates = [...completedDates]
        .sort((a, b) => a - b);

    if (!dates.length) {
        return 0;
    }

    let longest = 1;
    let currentStreak = 1;

    for (let i = 1; i < dates.length; i++) {
        let previous = new Date(dates[i - 1]);
        let current = new Date(dates[i]);

        previous.setDate(previous.getDate() + 1);

        while (isWeekend(previous)) {
            previous.setDate(previous.getDate() + 1);
        }

        if (previous.getTime() === current.getTime()) {
            currentStreak++;
        } else {
            longest = Math.max(longest, currentStreak);
            currentStreak = 1;
        }
    }

    return Math.max(longest, currentStreak);
};

const calculateUniqueProjects = (journals) => {

    const projects = new Set();

    journals.forEach(journal => {
        journal.projects.forEach(project => {
            if (project.trim()) {
                projects.add(project.trim());
            }
        });
    });

    return projects.size;
};

const getJournalStatistics = async (userId) => {

    const journals = await JournalEntry
        .find({ user: userId })
        .sort({ date: 1 });

    const completed = journals.filter(
        journal => journal.status === "completed"
    ).length;

    const drafts = journals.filter(
        journal => journal.status === "draft"
    ).length;

    const totalJournals = journals.length;

    const completionRate =
        totalJournals === 0
            ? 0
            : Number(
                (
                    (completed / totalJournals) *
                    100
                ).toFixed(1)
            );

    const draftRate =
        totalJournals === 0
            ? 0
            : Number(
                (
                    (drafts / totalJournals) *
                    100
                ).toFixed(1)
            );

    const tasksCompleted = journals.reduce(
        (total, journal) =>
            total + journal.tasksCompleted.length,
        0
    );

    const meetingsAttended = journals.reduce(
        (total, journal) =>
            total + journal.meetings.length,
        0
    );

    const challengesFaced = journals.reduce(
        (total, journal) =>
            total + journal.challenges.length,
        0
    );

    const solutionsDocumented = journals.reduce(
        (total, journal) =>
            total + journal.solutions.length,
        0
    );

    const learningsCaptured = journals.reduce(
        (total, journal) =>
            total + journal.learnings.length,
        0
    );

    const achievementsUnlocked = journals.reduce(
        (total, journal) =>
            total + journal.achievements.length,
        0
    );

    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonth = journals.filter(journal => {
        const date = new Date(journal.date);

        return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        );
    }).length;

    const thisYear = journals.filter(journal => {

        const date = new Date(journal.date);

        return date.getFullYear() === currentYear;

    }).length;

    return {
        totalJournals,

        completed,

        drafts,

        completionRate,

        draftRate,

        tasksCompleted,

        meetingsAttended,

        challengesFaced,

        solutionsDocumented,

        learningsCaptured,

        achievementsUnlocked,

        currentStreak: calculateCurrentStreak(journals),

        longestStreak: calculateLongestStreak(journals),

        projectsWorkedOn: calculateUniqueProjects(journals),

        thisMonth,

        thisYear,
    };
};

module.exports = {
    getCalendarEntries,
    getTodayJournal,
    updateDraft,
    submitJournal,
    openJournal,
    createJournal,
    getJournalById,
    searchJournals,
    // calculateCurrentStreak,
    // calculateLongestStreak,
    // calculateUniqueProjects,
    getJournalStatistics,
}