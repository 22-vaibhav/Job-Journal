const GuideSection = ({ icon, title, description, items = [] }) => {
    return (
        <section className="space-y-4 neu-raised rounded-[1.75rem] p-6 sm:p-7">
            <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl neu-inset-sm text-2xl">
                    {icon}
                </span>

                <h2
                    className="font-display text-xl font-medium tracking-tight neu-text"
                >
                    {title}
                </h2>
            </div>

            {description && (
                <p className="leading-7 neu-muted">
                    {description}
                </p>
            )}

            {items.length > 0 && (
                <ul className="space-y-3">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-3"
                        >
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full neu-inset-sm neu-accent bg-current"></span>

                            <span className="leading-7 neu-text">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default GuideSection;