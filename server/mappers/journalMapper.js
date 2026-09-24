const toJournalResponse = (journal) => {
    return {
        id: journal._id,
        date: journal.date,
        projects: journal.projects,
        tasksCompleted: journal.tasksCompleted,
        meetings: journal.meetings,
        challenges: journal.challenges,
        solutions: journal.solutions,
        learnings: journal.learnings,
        achievements: journal.achievements,
        notes: journal.notes,
        aiSummary: journal.aiSummary,
        status: journal.status,
        submittedAt: journal.submittedAt,
    }
}

module.exports = {
    toJournalResponse,
}