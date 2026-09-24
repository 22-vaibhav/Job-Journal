import { useState } from "react";
import { BookOpen } from "lucide-react";

import QuickGuideModal from "./QuickGuideModal";

const QuickGuideButton = () => {
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsGuideOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-200 hover:bg-emerald-50 hover:border-emerald-300 hover:shadow-[0_8px_20px_-8px_rgba(15,107,92,0.35)]"
            >
                <BookOpen size={17} />

                Quick Guide
            </button>

            <QuickGuideModal
                isOpen={isGuideOpen}
                onClose={() => setIsGuideOpen(false)}
            />
        </>
    );
};

export default QuickGuideButton;