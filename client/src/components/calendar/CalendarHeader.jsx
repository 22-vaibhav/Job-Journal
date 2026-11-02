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
                className="neu-btn neu-accent h-11 w-11 rounded-xl flex items-center justify-center"
            >
                <ChevronLeft size={20} />
            </button>

            <h2
                className="font-display text-2xl font-semibold tracking-tight neu-text"
            >
                {monthName} {currentYear}
            </h2>

            <button
                onClick={onNextMonth}
                aria-label="Next month"
                className="neu-btn neu-accent h-11 w-11 rounded-xl flex items-center justify-center"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default CalendarHeader;