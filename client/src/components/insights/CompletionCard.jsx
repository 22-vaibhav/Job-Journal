import { CheckCircle2 } from "lucide-react";

const CompletionCard = ({ stats }) => {

    return (
        <div
            className="
                bg-white
                rounded-2xl
                border
                border-slate-200/70
                shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-8px_rgba(16,24,40,0.10)]
                p-6
                sm:p-8
            "
        >

            <div className="flex items-center gap-3.5">
                <div className="bg-green-100 p-3 rounded-xl">
                    <CheckCircle2
                        size={24}
                        className="text-green-600"
                    />
                </div>

                <div>
                    <h2
                        className="text-xl font-semibold text-slate-900 tracking-tight"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Journal Completion
                    </h2>

                    <p className="text-slate-500 text-sm">
                        Your overall journaling progress
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex justify-between mb-2">
                    <span className="font-medium text-sm text-slate-600">
                        Completion Rate
                    </span>

                    <span className="font-semibold text-green-600">
                        {stats.completionRate}%
                    </span>
                </div>

                <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden">
                    <div
                        className="bg-green-500 h-4 rounded-full transition-all duration-500"
                        style={{
                            width: `${stats.completionRate}%`,
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center rounded-xl bg-slate-50 border border-slate-100 py-5">
                    <h3
                        className="text-3xl font-semibold text-green-600"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        {stats.completed}
                    </h3>

                    <p className="text-slate-500 mt-1 text-sm">
                        Completed Journals
                    </p>
                </div>

                <div className="text-center rounded-xl bg-slate-50 border border-slate-100 py-5">
                    <h3
                        className="text-3xl font-semibold text-yellow-500"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        {stats.drafts}
                    </h3>

                    <p className="text-slate-500 mt-1 text-sm">
                        Draft Journals
                    </p>
                </div>
            </div>

            <div className="mt-8 text-center text-slate-500 text-sm">

                You have completed

                <span className="font-semibold text-slate-700">
                    {" "}
                    {stats.completed}
                </span>

                {" "}out of{" "}

                <span className="font-semibold text-slate-700">
                    {stats.totalJournals}
                </span>

                {" "}journal entries.

            </div>
        </div>
    );
};

export default CompletionCard;