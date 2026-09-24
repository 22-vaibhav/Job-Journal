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
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
        },

        {
            title: "Longest Streak",
            value: `${stats.longestStreak} Days`,
            subtitle: "Personal best",
            icon: <Trophy size={26} />,
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
        },

        {
            title: "Total Journals",
            value: stats.totalJournals,
            subtitle: "Journal entries",
            icon: <BookOpen size={26} />,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },

        {
            title: "Projects",
            value: stats.projectsWorkedOn,
            subtitle: "Unique projects",
            icon: <FolderOpen size={26} />,
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600",
        },

        {
            title: "Completed",
            value: stats.completed,
            subtitle: "Completed journals",
            icon: <CheckCircle size={26} />,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },

        {
            title: "Drafts",
            value: stats.drafts,
            subtitle: "Draft journals",
            icon: <FileEdit size={26} />,
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
        },

        // {
        //     title: "Tasks Completed",
        //     value: stats.tasksCompleted,
        //     subtitle: "Tasks tracked",
        //     icon: <CheckSquare size={26} />,
        //     iconBg: "bg-purple-100",
        //     iconColor: "text-purple-600",
        // },

        // {
        //     title: "Meetings",
        //     value: stats.meetingsAttended,
        //     subtitle: "Meetings attended",
        //     icon: <Users size={26} />,
        //     iconBg: "bg-cyan-100",
        //     iconColor: "text-cyan-600",
        // },

        // {
        //     title: "Learnings",
        //     value: stats.learningsCaptured,
        //     subtitle: "Knowledge captured",
        //     icon: <Brain size={26} />,
        //     iconBg: "bg-sky-100",
        //     iconColor: "text-sky-600",
        // },

        // {
        //     title: "Achievements",
        //     value: stats.achievementsUnlocked,
        //     subtitle: "Milestones reached",
        //     icon: <Award size={26} />,
        //     iconBg: "bg-emerald-100",
        //     iconColor: "text-emerald-600",
        // },

        // {
        //     title: "Challenges",
        //     value: stats.challengesFaced,
        //     subtitle: "Problems tackled",
        //     icon: <TriangleAlert size={26} />,
        //     iconBg: "bg-red-100",
        //     iconColor: "text-red-600",
        // },

        // {
        //     title: "Solutions",
        //     value: stats.solutionsDocumented,
        //     subtitle: "Solutions documented",
        //     icon: <Lightbulb size={26} />,
        //     iconBg: "bg-teal-100",
        //     iconColor: "text-teal-600",
        // },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
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