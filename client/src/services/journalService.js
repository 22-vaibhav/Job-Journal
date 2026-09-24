import api from "./api";

export const getTodayJournal = async () => {
    const response = await api.get("/journal/today");
    return response.data;
};

export const updateJournal = async (journalId, journalData) => {
    const response = await api.put(
        `/journal/${journalId}`,
        journalData
    );

    return response.data;
};

export const submitJournal = async (journalId) => {
    const response = await api.put(
        `/journal/${journalId}/submit`
    );

    return response.data;
};

export const getCalendar = async (month, year) => {
    const response = await api.get(
        `/journal/calendar?month=${month}&year=${year}`
    );

    return response.data;
};

export const openJournal = async (date) => {
    const response = await api.post(
        "/journal/open",
        { date }
    );

    return response.data;
};

export const getJournalById = async (journalId) => {
    const response = await api.get(
        `/journal/${journalId}`
    );

    return response.data;
};

export const createJournal = async (journalData) => {
    const response = await api.post(
        "/journal",
        journalData
    );

    return response.data;
};

export const searchJournals = async (params = {}) => {
    const response = await api.get(
        "/journal/search",
        {
            params,
        }
    );

    return response.data;
};

export const getJournalStatistics = async () => {
    const response = await api.get("/journal/stats");
    return response.data;
};