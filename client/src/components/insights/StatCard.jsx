const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconBg = "neu-inset-sm",
    iconColor = "neu-accent",
}) => {

    return (
        <div
            className="
                neu-card
                p-6
                transition-all
                duration-300
            "
        >
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider neu-muted">
                        {title}
                    </p>

                    <h2
                        className="font-display text-3xl font-medium neu-text mt-2 tracking-tight"
                    >
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="text-sm neu-muted mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div
                    className={`
                        h-14
                        w-14
                        shrink-0
                        rounded-2xl
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