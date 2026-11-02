import { useEffect } from "react";
import { X, BookOpen } from "lucide-react";
import { createPortal } from "react-dom";

import GuideSection from "./GuideSection";
import { QUICK_GUIDE_CONTENT } from "../../constants/quickGuideContent";

const QuickGuideModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center neu-overlay p-4"
            onClick={onClose}
        >

            <div
                className="neu-card relative w-full max-w-5xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-6 sm:px-8 py-6">
                    <div className="flex items-center gap-4">
                        {/* <span
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0F6B5C 0%, #1B9C87 100%)",
                            }}
                        >
                            <BookOpen size={22} />
                        </span> */}
                        <span className="neu-inset-sm flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl overflow-hidden">
                            <img src="../../../public/journal.png" alt="JobJournal logo" className="h-full w-full object-contain p-1.5" />
                        </span>

                        <div>
                            <h1
                                className="font-display text-2xl font-medium tracking-tight neu-text"
                            >
                                JobJournal Guide
                            </h1>

                            <p className="mt-1 text-sm neu-muted">
                                Everything you need to know to get the most out
                                of JobJournal.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Close guide"
                        className="neu-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-xl neu-muted"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[calc(90vh-92px)] overflow-y-auto p-6 sm:p-8">
                    <div className="space-y-6">
                        {QUICK_GUIDE_CONTENT.map((section) => (
                            <GuideSection
                                key={section.id}
                                {...section}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default QuickGuideModal;