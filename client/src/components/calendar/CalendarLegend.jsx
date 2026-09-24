const CalendarLegend = () => {
    const items = [
        {
            color: "bg-green-500",
            label: "Completed",
        },
        {
            color: "bg-yellow-400",
            label: "Draft",
        },
        {
            color: "bg-red-500",
            label: "Missed",
        },
        {
            color: "bg-slate-300",
            label: "Weekend",
        },
        {
            color: "bg-white border",
            label: "Future",
        },
    ];

    return (
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7 pt-5 border-t border-slate-100">
            {items.map((item) => (
                <div
                    key={item.label}
                    className="flex items-center gap-2"
                >
                    <div
                        className={`w-3 h-3 rounded-full ${item.color}`}
                    />

                    <span className="text-sm text-slate-500 font-medium">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CalendarLegend;