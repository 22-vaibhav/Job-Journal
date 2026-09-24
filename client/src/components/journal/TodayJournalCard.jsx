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
                <div className="flex flex-col items-center justify-center gap-3 py-6 text-slate-500">
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-t-emerald-700 animate-spin" />
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
                <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                    <BookOpen size={22} className="text-slate-300" />
                    <p className="text-slate-500 text-sm">
                        No journal found.
                    </p>
                </div>
            </Card>
        );
    }

    const isCompleted = journal.status === "completed";

    return (
        <Card className="h-fit">
            <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700">
                    <BookOpen size={18} strokeWidth={2.25} />
                </span>
                <h2
                    className="text-xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    Today's Journal
                </h2>
            </div>

            <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <CheckCircle2 size={16} className={isCompleted ? "text-emerald-600" : "text-amber-500"} />
                        Status
                    </div>

                    <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${isCompleted
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                            }`}
                    >
                        {isCompleted ? "Completed" : "Draft"}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock size={16} className="text-slate-400" />
                    <span>
                        Last updated {dayjs(journal.updatedAt).format(
                            "DD MMM YYYY, hh:mm A"
                        )}
                    </span>
                </div>

                <p className="text-slate-500 text-sm">
                    Continue documenting today's work.
                </p>

                <Button
                    className="w-full flex items-center justify-center gap-2"
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