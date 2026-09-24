import { useEffect, useState } from "react";
import { getCalendar, openJournal, } from "../../services/journalService";
import { useCalendar } from "../../context/CalendarContext";

import { useNavigate } from "react-router-dom";

import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import CalendarLegend from "./CalendarLegend";

const Calendar = () => {
    const today = new Date();

    const { refreshKey } = useCalendar();

    const navigate = useNavigate();

    const [calendarData, setCalendarData] = useState([]);

    const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);

    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const previousMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear((prev) => prev - 1);
        } else {
            setCurrentMonth((prev) => prev - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear((prev) => prev + 1);
        } else {
            setCurrentMonth((prev) => prev + 1);
        }
    };

    const handleDayClick = async (date) => {
        try {
            const response = await openJournal(date);

            navigate("/journal", {
                state: {
                    journal: response.data,
                    exists: response.exists,
                },
            });

        } catch (error) {
            console.log(error);
        }
    };

    const loadCalendar = async () => {
        try {
            const response = await getCalendar(
                currentMonth,
                currentYear
            );

            setCalendarData(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadCalendar();
    }, [currentMonth, currentYear, refreshKey]);

    return (
        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-8px_rgba(16,24,40,0.10)] p-5 sm:p-7">

            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}
            </style>

            <CalendarHeader
                currentMonth={currentMonth}
                currentYear={currentYear}
                onPreviousMonth={previousMonth}
                onNextMonth={nextMonth}
            />

            <CalendarGrid
                currentMonth={currentMonth}
                currentYear={currentYear}
                calendarData={calendarData}
                onDayClick={handleDayClick}
            />

            <CalendarLegend />

        </div>
    );
};

export default Calendar;