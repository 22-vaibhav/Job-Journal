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
        <div className="w-full">

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