const getToday = () => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return today;
};

const getStartAndEndOfMonth = (year, month) => {
    // month passed as 1-12
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return { startDate, endDate };
};

module.exports = {
    getStartAndEndOfMonth,
    getToday,
};