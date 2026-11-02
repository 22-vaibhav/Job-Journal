import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { BookOpen, Clock, CheckCircle2, PenLine } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

import { getTodayJournal } from "../../services/journalService";

import { ROUTES } from "../../constants/routes"

const TodayJournalCard = () => {
    const navigate = useNavigate();

    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTodayJournal();
    }, []);

    const loadTodayJournal = async () => {
        try {
            const response = await getTodayJournal();
            setJournal(response.data);
        } catch (error) {
            toast.error("Unable to load today's journal.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Card className="h-fit">
                <div className="flex flex-col items-center justify-center gap-3 py-6 neu-muted">
                    <div className="w-6 h-6 rounded-full neu-inset-sm border-2 border-transparent border-t-current neu-accent animate-spin" />
                    <p className="text-sm font-medium">
                        Loading today's journal...
                    </p>
                </div>
            </Card>
        );
    }

    if (!journal) {
        return (
            <Card className="h-fit">
                <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                    <BookOpen size={24} className="neu-muted" />

                    <div>
                        <p className="neu-text font-medium">
                            Today's journal hasn't been started yet.
                        </p>

                        <p className="neu-muted text-sm mt-1">
                            Start documenting your work for today.
                        </p>
                    </div>

                    <Button
                        className="mt-2 w-full flex items-center justify-center gap-2 min-h-11"
                        onClick={() => {
                            navigate(ROUTES.JOURNAL, {
                                state: {
                                    startNew: true,
                                },
                            });
                        }}
                    >
                        <PenLine size={16} />
                        Start Today's Journal
                    </Button>
                </div>
            </Card>
        );
    }

    const isCompleted = journal.status === "completed";

    return (
        <Card className="h-fit">
            <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl neu-inset-sm neu-accent">
                    <BookOpen size={18} strokeWidth={2.25} />
                </span>
                <h2
                    className="font-display text-xl font-medium tracking-tight neu-text"
                >
                    Today's Journal
                </h2>
            </div>

            <div className="mt-6 space-y-5">
                <div className="neu-inset flex items-center justify-between rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2 text-sm neu-muted">
                        <CheckCircle2 size={16} className={isCompleted ? "neu-accent" : "neu-warn"} />
                        Status
                    </div>

                    <span
                        className={`neu-chip inline-flex items-center px-3 py-1 text-xs font-semibold ${isCompleted
                            ? "neu-accent"
                            : "neu-warn"
                            }`}
                    >
                        {isCompleted ? "Completed" : "Draft"}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm neu-muted">
                    <Clock size={16} className="neu-muted" />
                    <span>
                        Last updated {dayjs(journal.updatedAt).format(
                            "DD MMM YYYY, hh:mm A"
                        )}
                    </span>
                </div>

                <p className="neu-muted text-sm">
                    Continue documenting today's work.
                </p>

                <Button
                    className="w-full flex items-center justify-center gap-2 min-h-11"
                    onClick={() => {
                        navigate(ROUTES.JOURNAL, {
                            state: {
                                journal,
                            },
                        });
                    }
                    }
                >
                    {!isCompleted && <PenLine size={16} />}
                    {isCompleted
                        ? "View Today's Journal"
                        : "Continue Writing"}
                </Button>
            </div>
        </Card>
    );
};

export default TodayJournalCard;