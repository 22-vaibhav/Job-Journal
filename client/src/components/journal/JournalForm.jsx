import JournalSection from "./JournalSection";
import NotesSection from "./NotesSection";
import JournalActions from "./JournalActions";
import HelpTooltip from "../common/HelpTooltip";

const JournalForm = ({
    journal,
    setJournal,
    onSave,
    onSubmit,
    isCompleted,
}) => {
    const updateField = (field, value) => {
        setJournal((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-8px_rgba(16,24,40,0.10)] p-6 sm:p-9">

            <div className="space-y-9 divide-y divide-slate-100 [&>*:not(:first-child)]:pt-9">

                <JournalSection
                    title="Projects"
                    items={journal.projects || []}
                    setItems={(items) => updateField("projects", items)}
                    disabled={isCompleted}
                    help={{
                        title: "Projects",
                        description: "Select the project(s) you worked on today.",
                        examples: [
                            "ResumeLog AI",
                            "IBM Onboarding",
                            "Personal Portfolio",
                        ],
                        tips: [
                            "Type the project name.",
                            "Press Enter or click the + button to add it.",
                            "You can add multiple projects.",
                            "Use consistent project names for accurate analytics.",
                        ],
                    }}
                />

                <JournalSection
                    title="Tasks Completed"
                    items={journal.tasksCompleted || []}
                    setItems={(items) => updateField("tasksCompleted", items)}
                    disabled={isCompleted}
                    help={{
                        title: "Tasks Completed",
                        description: "List the work you completed today.",
                        examples: [
                            "Implemented JWT Authentication",
                            "Designed the Profile Page",
                            "Fixed Calendar Timezone Bug"
                        ],
                        tips: [
                            "Write one task at a time.",
                            "Press Enter or click the + button after each task.",
                            "Start each task with an action word like Built, Fixed, Created or Designed.",
                            "Avoid vague entries like 'Coding' or 'Worked'."
                        ]
                    }}
                />

                <JournalSection
                    title="Meetings"
                    items={journal.meetings || []}
                    setItems={(items) => updateField("meetings", items)}
                    disabled={isCompleted}
                    help={{
                        title: "Meetings",
                        description: "Record important meetings you attended today.",
                        examples: [
                            "Daily Stand-up",
                            "Sprint Planning",
                            "Client Demo",
                            "Team Retrospective"
                        ],
                        tips: [
                            "Leave this section empty if you had no meetings.",
                            "Press Enter or click the + button to add each meeting.",
                            "Mention only meaningful meetings."
                        ]
                    }}
                />

                <JournalSection
                    title="Challenges"
                    items={journal.challenges || []}
                    setItems={(items) => updateField("challenges", items)}
                    disabled={isCompleted}
                    help={{
                        title: "Challenges",
                        description: "Describe any blockers or problems you faced today.",
                        examples: [
                            "API timeout issue",
                            "Merge conflict",
                            "Authentication bug",
                            "Database connection failure"
                        ],
                        tips: [
                            "Mention the actual problem.",
                            "Press Enter or click the + button after each challenge.",
                            "Describe how it affected your work."
                        ]
                    }}
                />

                <JournalSection
                    title="Solutions"
                    items={journal.solutions || []}
                    setItems={(items) => updateField("solutions", items)}
                    disabled={isCompleted}
                    help={{
                        title: "Solutions",
                        description: "Describe how you resolved the challenges.",
                        examples: [
                            "Optimized MongoDB query",
                            "Updated JWT middleware",
                            "Restarted Docker container",
                            "Refactored API logic"
                        ],
                        tips: [
                            "Match each solution to a challenge whenever possible.",
                            "Press Enter or click the + button to add multiple solutions.",
                            "Keep the explanation concise."
                        ]
                    }}
                />

                <JournalSection
                    title="Learnings"
                    items={journal.learnings || []}
                    setItems={(items) => updateField("learnings", items)}
                    disabled={isCompleted}
                    help={{
                        title: "Learnings",
                        description: "Capture something new you learned today.",
                        examples: [
                            "MongoDB Aggregation",
                            "React Context API",
                            "JWT Authentication",
                            "Docker Networking"
                        ],
                        tips: [
                            "Mention technical concepts, tools or best practices.",
                            "Press Enter or click the + button after each learning.",
                            "This section helps track your professional growth."
                        ]
                    }}
                />

                <JournalSection
                    title="Achievements"
                    items={journal.achievements || []}
                    setItems={(items) => updateField("achievements", items)}
                    disabled={isCompleted}
                    help={{
                        title: "Achievements",
                        description: "Highlight your accomplishments or milestones.",
                        examples: [
                            "Completed Search Feature",
                            "Closed 5 Jira Tickets",
                            "Deployed Production Build",
                            "Completed IBM Onboarding"
                        ],
                        tips: [
                            "Mention measurable accomplishments.",
                            "Press Enter or click the + button to add multiple achievements.",
                            "Avoid repeating items already listed in Tasks Completed."
                        ]
                    }}
                />

                <NotesSection
                    notes={journal.notes || ""}
                    setNotes={(value) => updateField("notes", value)}
                    disabled={isCompleted}
                />

            </div>

            {!isCompleted && (
                <JournalActions
                    onSave={onSave}
                    onSubmit={onSubmit}
                />
            )}

        </div>
    );
};

export default JournalForm;