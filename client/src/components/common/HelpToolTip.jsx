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
                className="rounded-full text-gray-400 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
                <CircleHelp size={18} />
            </button>

            {isOpen && (
                <div
                    className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 ${width}`}
                >
                    {/* Arrow */}
                    <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-gray-200 bg-white"></div>

                    {/* Card */}
                    <div className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
                        <h3 className="mb-2 text-base font-semibold text-gray-900">
                            {title}
                        </h3>

                        {description && (
                            <p className="mb-4 text-sm leading-6 text-gray-600">
                                {description}
                            </p>
                        )}

                        {examples.length > 0 && (
                            <div className="mb-4">
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                                    Examples
                                </h4>

                                <ul className="space-y-1 text-sm text-gray-700">
                                    {examples.map((example, index) => (
                                        <li key={index}>• {example}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {tips.length > 0 && (
                            <div>
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">
                                    Tips
                                </h4>

                                <ul className="space-y-1 text-sm text-gray-700">
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