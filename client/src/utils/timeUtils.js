export const formatTime12Hour = (time24) => {

    if (!time24) return "";

    const [hour, minute] = time24.split(":");

    const date = new Date();

    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

};