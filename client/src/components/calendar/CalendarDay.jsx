const CalendarDay = ({
    day,
    isCurrentMonth,
    status,
    isToday,
    onClick,
}) => {
    // Each status differs by surface depth AND a distinct marker shape,
    // so it never relies on colour alone.
    const colors = {
        // pressed-in well + filled dot
        completed: "neu-inset-sm neu-text",

        // raised + hollow ring
        draft: "neu-raised-sm neu-text",

        // dashed outline + square marker
        missed: "neu-text border-2 border-dashed border-current",

        // flat, muted + dash marker
        weekend: "neu-muted",

        // faint, no marker
        future: "neu-muted opacity-60",

        empty: "bg-transparent border-none cursor-default",
    };

    const labels = {
        completed: "Completed",
        draft: "Draft",
        missed: "Missed",
        weekend: "Weekend",
        future: "Future",
    };

    const marker = {
        completed: "w-1.5 h-1.5 rounded-full bg-current neu-accent",
        draft: "w-1.5 h-1.5 rounded-full border-2 border-current neu-warn",
        missed: "w-1.5 h-1.5 rotate-45 bg-current neu-danger",
        weekend: "w-2 h-0.5 rounded-full bg-current neu-muted",
    };

    return (
        <div
            onClick={onClick}
            aria-label={labels[status] ? `${day}, ${labels[status]}` : undefined}
            className={`
                aspect-square
                min-h-11
                rounded-lg
                sm:rounded-2xl
                flex
                flex-col
                gap-0.5
                items-center
                justify-center
                text-xs
                sm:text-sm
                font-semibold
                transition-all
                duration-150
                ${colors[status]}
                ${isToday ? " outline outline-2 sm:outline-[3px] outline-offset-2 outline-[var(--neu-accent)]" : ""}

                ${status !== "future" &&
                    status !== "empty"
                    ? "cursor-pointer hover:scale-105"
                    : ""
                }
            `}
        >
            {day}
            {marker[status] && (
                <span aria-hidden="true" className={marker[status]} />
            )}
        </div>
    );
};

export default CalendarDay;