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
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}
            </style>

            <div
                className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-slate-50 border border-slate-200/70 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur px-6 sm:px-8 py-6">
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
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl overflow-hidden bg-white border border-slate-200">
                            <img src="../../../public/journal.png" alt="JobJournal logo" className="h-full w-full object-contain p-1.5" />
                        </span>

                        <div>
                            <h1
                                className="text-2xl font-semibold text-slate-900 tracking-tight"
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                JobJournal Guide
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Everything you need to know to get the most out
                                of ResumeLog AI.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Close guide"
                        className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
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