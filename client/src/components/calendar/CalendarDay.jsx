const CalendarDay = ({
    day,
    isCurrentMonth,
    status,
    isToday,
    onClick,
}) => {
    const colors = {
        completed: "bg-green-500 text-white",

        draft: "bg-yellow-400 text-black",

        missed: "bg-red-500 text-white",

        weekend: "bg-slate-400 text-white",

        future: "bg-white",

        empty: "bg-transparent border-none cursor-default",
    };

    return (
        <div
            onClick={onClick}
            className={`
                aspect-square
                rounded-xl
                border
                border-slate-200/70
                flex
                items-center
                justify-center
                text-sm
                font-semibold
                transition-all
                duration-150
                ${colors[status]}
                ${isToday ? " ring-4 ring-blue-600" : ""}

                ${status !== "future" &&
                    status !== "empty"
                    ? "cursor-pointer hover:scale-105 hover:shadow-md"
                    : ""
                }
            `}
        >
            {day}
        </div>
    );
};

export default CalendarDay;