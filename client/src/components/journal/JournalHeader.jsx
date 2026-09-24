import { ArrowLeft, CheckCircle2, PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const JournalHeader = ({ status = "Draft" }) => {
    const navigate = useNavigate();

    const isCompleted = status.toLowerCase() === "completed";

    return (
        <div className="border-b border-slate-200 pb-7">

            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}
            </style>

            <button
                onClick={() => navigate(ROUTES.JOURNEY)}
                className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700 transition-colors mb-6"
            >
                <ArrowLeft size={18} />
                Back to My Journey
            </button>

            <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                        Daily Log
                    </p>
                    <h1
                        className="mt-1 text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Today's Journal
                    </h1>

                    <p className="text-slate-500 mt-2 text-sm">
                        {new Date().toLocaleDateString("en-IN", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>

                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold ${isCompleted
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                        }`}
                >
                    {isCompleted ? <CheckCircle2 size={15} /> : <PenLine size={15} />}
                    {status}
                </span>
            </div>

        </div>
    );
};

export default JournalHeader;