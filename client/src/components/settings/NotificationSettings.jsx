import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getNotifications,
    updateNotifications,
} from "../../services/settingsService";

const NotificationSettings = () => {
    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState({
        dailyReminder: {
            enabled: true,
            time: "20:00",
        },

        weeklyReport: {
            enabled: true,
            day: "Sunday",
            time: "18:00",
        },

        monthlyReport: {
            enabled: true,
            day: 1,
            time: "09:00",
        },
    });

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await getNotifications();

            // console.log("Notification API Response:", response);

            setNotifications(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load notification settings.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (field) => {
        setNotifications((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                enabled: !prev[field].enabled,
            },
        }));
    };

    const handleSave = async () => {
        try {
            await updateNotifications(notifications);
            // console.log(notifications);

            toast.success("Notification preferences updated.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update notification settings.");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-10 neu-muted">
                <div className="neu-inset-sm w-7 h-7 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: "var(--neu-accent)" }} />
                <p className="text-sm font-medium">Loading...</p>
            </div>
        );
    }

    const options = [
        {
            key: "dailyReminder",
            title: "Daily Reminder",
            description: "Receive a reminder every day at 8:30 PM if today's journal is incomplete.",
        },
        {
            key: "weeklyReport",
            title: "Weekly Report",
            description: "Receive a summary of your weekly productivity every Sunday.",
        },
        {
            key: "monthlyReport",
            title: "Monthly Report",
            description: "Receive your monthly productivity report on the first day of each month.",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2
                    className="font-display text-2xl font-medium neu-text tracking-tight"
                >
                    Notifications
                </h2>

                <p className="mt-2 neu-muted">
                    Choose which emails Job Journal should send you.
                </p>
            </div>

            <div className="space-y-5">
                {options.map((option) => (
                    <div
                        key={option.key}
                        className="neu-raised flex items-center justify-between gap-4 rounded-2xl p-5"
                    >
                        <div>
                            <h3 className="text-[17px] font-semibold neu-text">
                                {option.title}
                            </h3>

                            <p className="mt-1 text-sm neu-muted">
                                {option.description}
                            </p>
                        </div>

                        <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={notifications[option.key]?.enabled ?? false}
                                onChange={() => handleToggle(option.key)}
                            />

                            <div className="neu-inset h-8 w-14 rounded-full transition peer-checked:bg-[var(--neu-accent)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--neu-accent)]"></div>

                            <div className="neu-raised-sm absolute left-1 top-1 h-6 w-6 rounded-full transition peer-checked:translate-x-6"></div>
                        </label>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-2">
                <button
                    onClick={handleSave}
                    className="neu-btn neu-btn-accent h-12 w-full sm:w-auto px-8 py-3"
                >
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default NotificationSettings;