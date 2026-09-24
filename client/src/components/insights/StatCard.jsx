const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconBg = "bg-blue-100",
    iconColor = "text-blue-600",
}) => {

    return (
        <div
            className="
                bg-white
                rounded-2xl
                border
                border-slate-200/70
                shadow-[0_1px_2px_rgba(16,24,40,0.04)]
                p-6
                hover:shadow-[0_8px_24px_-8px_rgba(16,24,40,0.14)]
                hover:-translate-y-0.5
                transition-all
                duration-300
            "
        >
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {title}
                    </p>

                    <h2
                        className="text-3xl font-semibold text-slate-900 mt-2 tracking-tight"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="text-sm text-slate-400 mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div
                    className={`
                        h-14
                        w-14
                        shrink-0
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        ${iconBg}
                    `}
                >
                    <span
                        className={`
                            ${iconColor}
                        `}
                    >
                        {icon}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;