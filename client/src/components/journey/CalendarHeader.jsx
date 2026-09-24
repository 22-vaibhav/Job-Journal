import dayjs from "dayjs";

const CalendarHeader = () => {
    return (
        <div className="flex items-center justify-between mb-6">
            <button>{"<"}</button>

            <h2 className="text-2xl font-semibold">
                {dayjs().format("MMMM YYYY")}
            </h2>

            <button>{">"}</button>
        </div>
    );
};

export default CalendarHeader;