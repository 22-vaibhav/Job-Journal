import { ArrowLeft, CheckCircle2, PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const JournalHeader = ({ status = "Draft" }) => {
    const navigate = useNavigate();

    const isCompleted = status.toLowerCase() === "completed";

    return (
        <div className="pb-2">

            <button
                onClick={() => navigate(ROUTES.JOURNEY)}
                className="neu-btn inline-flex items-center gap-2 px-4 min-h-11 text-sm neu-muted mb-8"
            >
                <ArrowLeft size={18} />
                Back to My Journey
            </button>

            <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] neu-accent">
                        Daily Log
                    </p>
                    <h1
                        className="mt-1 font-display text-3xl sm:text-4xl font-medium tracking-tight neu-text"
                    >
                        Today's Journal
                    </h1>

                    <p className="neu-muted mt-2 text-sm">
                        {new Date().toLocaleDateString("en-IN", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>

                <span
                    className={`neu-chip inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold ${isCompleted
                        ? "neu-accent"
                        : "neu-warn"
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