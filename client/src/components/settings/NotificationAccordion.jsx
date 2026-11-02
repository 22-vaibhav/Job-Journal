import { ChevronDown } from "lucide-react";

const NotificationAccordion = ({
    title,
    isOpen,
    onToggle,
    children,
}) => {
    return (
        <div className="neu-raised mb-5 overflow-hidden rounded-2xl">

            <button
                type="button"
                onClick={onToggle}
                className="neu-link flex min-h-12 w-full items-center justify-between rounded-2xl px-5 py-4"
            >
                <h3 className="text-base font-semibold neu-text">
                    {title}
                </h3>

                <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"
                    }`}
            >
                <div className="px-5 pb-5 pt-2">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default NotificationAccordion;