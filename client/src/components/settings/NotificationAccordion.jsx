import { ChevronDown } from "lucide-react";

const NotificationAccordion = ({
    title,
    isOpen,
    onToggle,
    children,
}) => {
    return (
        <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white">

            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between px-5 py-4 transition hover:bg-gray-50"
            >
                <h3 className="text-base font-semibold text-gray-800">
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
                <div className="border-t border-gray-100 px-5 py-5">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default NotificationAccordion;