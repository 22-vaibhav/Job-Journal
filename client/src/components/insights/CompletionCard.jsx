import { CheckCircle2 } from "lucide-react";

const CompletionCard = ({ stats }) => {

    return (
        <div
            className="
                neu-card
                p-6
                sm:p-8
            "
        >

            <div className="flex items-center gap-3.5">
                <div className="neu-inset-sm p-3 rounded-xl">
                    <CheckCircle2
                        size={24}
                        className="neu-accent"
                    />
                </div>

                <div>
                    <h2
                        className="font-display text-xl font-medium neu-text tracking-tight"
                    >
                        Journal Completion
                    </h2>

                    <p className="neu-muted text-sm">
                        Your overall journaling progress
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex justify-between mb-2">
                    <span className="font-medium text-sm neu-muted">
                        Completion Rate
                    </span>

                    <span className="font-semibold neu-accent">
                        {stats.completionRate}%
                    </span>
                </div>

                <div className="w-full h-5 p-1 rounded-full neu-inset-sm">
                    <div
                        className="bg-[var(--neu-accent)] h-3 rounded-full transition-all duration-500"
                        style={{
                            width: `${stats.completionRate}%`,
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center rounded-2xl neu-inset py-5">
                    <h3
                        className="font-display text-3xl font-medium neu-accent"
                    >
                        {stats.completed}
                    </h3>

                    <p className="neu-muted mt-1 text-sm">
                        Completed Journals
                    </p>
                </div>

                <div className="text-center rounded-2xl neu-inset py-5">
                    <h3
                        className="font-display text-3xl font-medium neu-warn"
                    >
                        {stats.drafts}
                    </h3>

                    <p className="neu-muted mt-1 text-sm">
                        Draft Journals
                    </p>
                </div>
            </div>

            <div className="mt-8 text-center neu-muted text-sm">

                You have completed

                <span className="font-semibold neu-text">
                    {" "}
                    {stats.completed}
                </span>

                {" "}out of{" "}

                <span className="font-semibold neu-text">
                    {stats.totalJournals}
                </span>

                {" "}journal entries.

            </div>
        </div>
    );
};

export default CompletionCard;