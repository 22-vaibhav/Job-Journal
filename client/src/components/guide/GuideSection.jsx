const GuideSection = ({ icon, title, description, items = [] }) => {
    return (
        <section className="space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 sm:p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                    {icon}
                </span>

                <h2
                    className="text-xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    {title}
                </h2>
            </div>

            {description && (
                <p className="leading-7 text-slate-600">
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
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600"></span>

                            <span className="leading-7 text-slate-700">
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