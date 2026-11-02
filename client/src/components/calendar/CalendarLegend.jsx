const CalendarLegend = () => {
    const items = [
        {
            color: "neu-inset-sm neu-accent",
            marker: "w-1.5 h-1.5 rounded-full bg-current",
            label: "Completed",
        },
        {
            color: "neu-raised-sm neu-warn",
            marker: "w-1.5 h-1.5 rounded-full border-2 border-current",
            label: "Draft",
        },
        {
            color: "border-2 border-dashed border-current neu-danger",
            marker: "w-1.5 h-1.5 rotate-45 bg-current",
            label: "Missed",
        },
        {
            color: "neu-muted",
            marker: "w-2 h-0.5 rounded-full bg-current",
            label: "Weekend",
        },
        {
            color: "neu-muted opacity-60",
            marker: "",
            label: "Future",
        },
    ];

    return (
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7 pt-5 relative">
            <div className="neu-divider absolute top-0 left-0 right-0" />
            {items.map((item) => (
                <div
                    key={item.label}
                    className="flex items-center gap-2"
                >
                    <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center ${item.color}`}
                    >
                        {item.marker && (
                            <span aria-hidden="true" className={item.marker} />
                        )}
                    </div>

                    <span className="text-sm neu-muted font-medium">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CalendarLegend;