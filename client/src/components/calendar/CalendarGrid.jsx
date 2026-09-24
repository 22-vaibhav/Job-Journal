import CalendarDay from "./CalendarDay";

const CalendarGrid = ({
    currentMonth,
    currentYear,
    calendarData,
    onDayClick,
}) => {
    const formatLocalDate = (date) => {
        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    // Map journals by YYYY-MM-DD
    const journalMap = new Map();

    calendarData.forEach((journal) => {

        const journalDate = new Date(journal.date);
        const key = formatLocalDate(journalDate);
        journalMap.set(
            key,
            journal.status
        );
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(
        currentYear,
        currentMonth - 1,
        1
    );

    const firstWeekday = firstDayOfMonth.getDay();

    const totalDays = new Date(
        currentYear,
        currentMonth,
        0
    ).getDate();

    const cells = [];

    // Empty cells before the first day
    for (let i = 0; i < firstWeekday; i++) {
        cells.push(null);
    }

    // Actual dates
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(
            currentYear,
            currentMonth - 1,
            day
        );

        date.setHours(0, 0, 0, 0);

        const key = formatLocalDate(date);

        let status;

        if (journalMap.has(key)) {
            // Existing journal always wins
            status = journalMap.get(key);
        } else if (date > today) {
            status = "future";
        } else if (date.getDay() === 0 || date.getDay() === 6) {
            // Weekend with no journal
            status = "weekend";
        } else {
            // Past weekday with no journal
            status = "missed";
        }

        const isToday = date.getTime() === today.getTime();

        cells.push({
            day,
            date: key,
            status,
            isToday,
        });
    }

    // Fill remaining cells
    while (cells.length < 42) {
        cells.push(null);
    }

    return (
        <>
            <div className="grid grid-cols-7 gap-2 mb-3 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div
                        key={d}
                        className="text-xs font-semibold uppercase tracking-wider text-slate-400"
                    >
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {cells.map((cell, index) => (
                    <CalendarDay
                        key={index}
                        day={cell?.day ?? ""}
                        status={cell?.status ?? "empty"}
                        isToday={cell?.isToday ?? false}
                        onClick={() => {
                            if (!cell) return;

                            if (cell.status === "future")
                                return;

                            onDayClick(cell.date);
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default CalendarGrid;