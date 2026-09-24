import {
    User,
    Shield,
    Bell,
    Palette,
    TriangleAlert,
} from "lucide-react";

export const SETTINGS_TABS = [
    {
        id: "profile",
        label: "Profile",
        icon: User,
    },
    {
        id: "account",
        label: "Account",
        icon: Shield,
    },
    {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
    },
    {
        id: "appearance",
        label: "Appearance",
        icon: Palette,
    },
    {
        id: "danger",
        label: "Danger Zone",
        icon: TriangleAlert,
    },
];