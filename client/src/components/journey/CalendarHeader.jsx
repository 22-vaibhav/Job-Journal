import dayjs from "dayjs";

const CalendarHeader = () => {
    return (
        <div className="flex items-center justify-between mb-6">
            <button className="neu-btn h-11 w-11 rounded-xl neu-accent" aria-label="Previous month">{"<"}</button>

            <h2 className="font-display text-2xl font-semibold tracking-tight neu-text">
                {dayjs().format("MMMM YYYY")}
            </h2>

            <button className="neu-btn h-11 w-11 rounded-xl neu-accent" aria-label="Next month">{">"}</button>
        </div>
    );
};

export default CalendarHeader;