import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarHeader = ({
    currentMonth,
    currentYear,
    onPreviousMonth,
    onNextMonth,
}) => {
    const monthName = new Date(
        currentYear,
        currentMonth - 1
    ).toLocaleString("default", {
        month: "long",
    });

    return (
        <div className="flex items-center justify-between mb-7">
            <button
                onClick={onPreviousMonth}
                aria-label="Previous month"
                className="p-2 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
                <ChevronLeft size={20} />
            </button>

            <h2
                className="text-2xl font-semibold text-slate-900 tracking-tight"
                style={{ fontFamily: "'Fraunces', serif" }}
            >
                {monthName} {currentYear}
            </h2>

            <button
                onClick={onNextMonth}
                aria-label="Next month"
                className="p-2 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default CalendarHeader;