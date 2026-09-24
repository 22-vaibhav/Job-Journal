import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";

import JournalHeader from "../../components/journal/JournalHeader";
import JournalForm from "../../components/journal/JournalForm";

import { useCalendar } from "../../context/CalendarContext";

import {
    getJournalById,
    getTodayJournal,
    updateJournal,
    submitJournal,
    createJournal,
} from "../../services/journalService"

import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const JournalPage = () => {

    const { refreshCalendar } = useCalendar();

    const [journal, setJournal] = useState(null);

    const isCompleted = journal?.status === "completed";

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const initialJournal = location.state?.journal;

    const handleSave = async () => {
        try {
            let response;

            if (journal.id) {
                response = await updateJournal(
                    journal.id,
                    journal
                );
            } else {
                const payload = {
                    date: journal.date,
                    projects: journal.projects,
                    tasksCompleted: journal.tasksCompleted,
                    meetings: journal.meetings,
                    challenges: journal.challenges,
                    solutions: journal.solutions,
                    learnings: journal.learnings,
                    achievements: journal.achievements,
                    notes: journal.notes,
                    status: "draft",
                };
                response = await createJournal(payload);
            }

            setJournal(response.data);

            toast.success("Draft saved successfully.");

            refreshCalendar();
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message ||
                "Unable to save draft."
            );
        }
    };

    const handleSubmit = async () => {
        try {
            let journalId = journal.id;

            if (!journalId) {
                const payload = {
                    date: journal.date,
                    projects: journal.projects,
                    tasksCompleted: journal.tasksCompleted,
                    meetings: journal.meetings,
                    challenges: journal.challenges,
                    solutions: journal.solutions,
                    learnings: journal.learnings,
                    achievements: journal.achievements,
                    notes: journal.notes,
                    status: "draft",
                };

                const createResponse = await createJournal(payload);
                journalId = createResponse.data.id;
                setJournal(createResponse.data);
                refreshCalendar();
            }

            await submitJournal(journalId);

            toast.success("Journal submitted successfully.");

            navigate(ROUTES.JOURNEY);
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message ||
                "Submission failed."
            );
        }
    };

    useEffect(() => {
        if (initialJournal) {
            setJournal(initialJournal);
            setLoading(false);
            return;
        }
        loadJournal();
    }, []);

    const loadJournal = async () => {
        try {
            const response = await getTodayJournal();

            setJournal(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <PageContainer>
            <Card className="max-w-5xl mx-auto">
                <JournalHeader status={journal.status} />
                <div className="mt-10">
                    <JournalForm
                        journal={journal}
                        setJournal={setJournal}
                        onSave={handleSave}
                        onSubmit={handleSubmit}
                        isCompleted={isCompleted}
                    />
                </div>
            </Card>
        </PageContainer>
    );
};

export default JournalPage;