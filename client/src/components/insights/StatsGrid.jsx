import {
    Flame,
    Trophy,
    BookOpen,
    FolderOpen,
    CheckCircle,
    FileEdit,
    CheckSquare,
    Users,
    Brain,
    Award,
    TriangleAlert,
    Lightbulb,
} from "lucide-react";

import StatCard from "./StatCard";

const StatsGrid = ({ stats }) => {

    const cards = [
        {
            title: "Current Streak",
            value: `${stats.currentStreak} Days`,
            subtitle: "Current progress",
            icon: <Flame size={26} />,
            iconBg: "neu-inset-sm",
            iconColor: "neu-warn",
        },

        {
            title: "Longest Streak",
            value: `${stats.longestStreak} Days`,
            subtitle: "Personal best",
            icon: <Trophy size={26} />,
            iconBg: "neu-inset-sm",
            iconColor: "neu-warn",
        },

        {
            title: "Total Journals",
            value: stats.totalJournals,
            subtitle: "Journal entries",
            icon: <BookOpen size={26} />,
            iconBg: "neu-inset-sm",
            iconColor: "neu-accent",
        },

        {
            title: "Projects",
            value: stats.projectsWorkedOn,
            subtitle: "Unique projects",
            icon: <FolderOpen size={26} />,
            iconBg: "neu-inset-sm",
            iconColor: "neu-accent",
        },

        {
            title: "Completed",
            value: stats.completed,
            subtitle: "Completed journals",
            icon: <CheckCircle size={26} />,
            iconBg: "neu-inset-sm",
            iconColor: "neu-accent",
        },

        {
            title: "Drafts",
            value: stats.drafts,
            subtitle: "Draft journals",
            icon: <FileEdit size={26} />,
            iconBg: "neu-inset-sm",
            iconColor: "neu-warn",
        },

        // {
        //     title: "Tasks Completed",
        //     value: stats.tasksCompleted,
        //     subtitle: "Tasks tracked",
        //     icon: <CheckSquare size={26} />,
        //     iconBg: "neu-inset-sm",
        //     iconColor: "neu-accent",
        // },

        // {
        //     title: "Meetings",
        //     value: stats.meetingsAttended,
        //     subtitle: "Meetings attended",
        //     icon: <Users size={26} />,
        //     iconBg: "neu-inset-sm",
        //     iconColor: "neu-accent",
        // },

        // {
        //     title: "Learnings",
        //     value: stats.learningsCaptured,
        //     subtitle: "Knowledge captured",
        //     icon: <Brain size={26} />,
        //     iconBg: "neu-inset-sm",
        //     iconColor: "neu-accent",
        // },

        // {
        //     title: "Achievements",
        //     value: stats.achievementsUnlocked,
        //     subtitle: "Milestones reached",
        //     icon: <Award size={26} />,
        //     iconBg: "neu-inset-sm",
        //     iconColor: "neu-accent",
        // },

        // {
        //     title: "Challenges",
        //     value: stats.challengesFaced,
        //     subtitle: "Problems tackled",
        //     icon: <TriangleAlert size={26} />,
        //     iconBg: "neu-inset-sm",
        //     iconColor: "neu-danger",
        // },

        // {
        //     title: "Solutions",
        //     value: stats.solutionsDocumented,
        //     subtitle: "Solutions documented",
        //     icon: <Lightbulb size={26} />,
        //     iconBg: "neu-inset-sm",
        //     iconColor: "neu-accent",
        // },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {
                cards.map((card) => (
                    <StatCard
                        key={card.title}
                        {...card}
                    />
                ))
            }
        </div>
    );
};

export default StatsGrid;