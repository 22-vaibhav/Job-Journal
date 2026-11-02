import { NotebookPen } from "lucide-react";
import HelpToolTip from "../common/HelpToolTip";

const NotesSection = ({ notes, setNotes, disabled, }) => {
    return (
        <div className="space-y-4">

            <div className="flex items-center gap-3">
                <span className="w-1.5 h-5 rounded-full neu-inset-sm" />

                <h2
                    className="font-display text-lg sm:text-xl font-medium tracking-tight neu-text"
                >
                    Notes
                </h2>

                <HelpToolTip
                    title="Notes"

                    description="Use this section for any additional information that doesn't fit into the other categories."

                    examples={[
                        "Client appreciated today's demo.",
                        "Need to follow up on authentication issue tomorrow.",
                        "Deployment scheduled for Friday evening."
                    ]}

                    tips={[
                        "This section is optional.",
                        "Use it for reminders, observations or important context.",
                        "Avoid duplicating information from other sections."
                    ]}
                />
            </div>

            <div className="relative">
                <NotebookPen
                    size={16}
                    className="absolute left-4 top-4 neu-muted"
                />
                <textarea
                    rows={6}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={disabled}
                    placeholder="Write anything important about today..."
                    className="neu-input w-full pl-11 pr-4 py-3.5 text-sm resize-none"
                />
            </div>

        </div>
    );
};

export default NotesSection;