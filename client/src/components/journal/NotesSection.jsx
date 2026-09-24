import { NotebookPen } from "lucide-react";
import HelpTooltip from "../common/HelpTooltip";

const NotesSection = ({ notes, setNotes, disabled, }) => {
    return (
        <div className="space-y-4">

            <div className="flex items-center gap-3">
                <span className="w-1 h-5 rounded-full bg-emerald-700" />

                <h2
                    className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    Notes
                </h2>

                <HelpTooltip
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
                    className="absolute left-4 top-4 text-slate-300"
                />
                <textarea
                    rows={6}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={disabled}
                    placeholder="Write anything important about today..."
                    className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700/60 disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                />
            </div>

        </div>
    );
};

export default NotesSection;