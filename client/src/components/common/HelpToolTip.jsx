import { useState } from "react";
import { CircleHelp } from "lucide-react";

const HelpTooltip = ({
    title,
    description,
    examples = [],
    tips = [],
    width = "w-80",
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative inline-flex items-center"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="neu-btn neu-muted inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 hover:text-[var(--neu-accent)]"
            >
                <CircleHelp size={18} aria-hidden="true" />
            </button>

            {isOpen && (
                <div
                    className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 ${width}`}
                >
                    {/* Arrow */}
                    <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 neu-ground"></div>

                    {/* Card */}
                    <div className="relative neu-raised-lg rounded-2xl p-4 neu-text">
                        <h3 className="font-display mb-2 text-base font-medium neu-text">
                            {title}
                        </h3>

                        {description && (
                            <p className="mb-4 text-sm leading-6 neu-muted">
                                {description}
                            </p>
                        )}

                        {examples.length > 0 && (
                            <div className="mb-4">
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider neu-accent">
                                    Examples
                                </h4>

                                <ul className="space-y-1 text-sm neu-text">
                                    {examples.map((example, index) => (
                                        <li key={index}>• {example}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {tips.length > 0 && (
                            <div>
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider neu-accent">
                                    Tips
                                </h4>

                                <ul className="space-y-1 text-sm neu-text">
                                    {tips.map((tip, index) => (
                                        <li key={index}>✓ {tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpTooltip;