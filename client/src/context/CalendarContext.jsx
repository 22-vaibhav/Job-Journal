import { createContext, useContext, useState } from "react";

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshCalendar = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <CalendarContext.Provider
            value={{
                refreshKey,
                refreshCalendar,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendar = () => useContext(CalendarContext);