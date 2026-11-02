import { useState } from "react";
import { BookOpen } from "lucide-react";

import QuickGuideModal from "./QuickGuideModal";

const QuickGuideButton = () => {
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsGuideOpen(true)}
                className="neu-btn neu-btn-accent inline-flex items-center gap-2 rounded-xl px-4 min-h-11 text-sm"
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