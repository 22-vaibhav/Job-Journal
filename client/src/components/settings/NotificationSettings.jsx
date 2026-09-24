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
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-slate-500">
                <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-t-emerald-700 animate-spin" />
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
                    className="text-2xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    Notifications
                </h2>

                <p className="mt-2 text-slate-500">
                    Choose which emails Job Journal should send you.
                </p>
            </div>

            <div className="space-y-3">
                {options.map((option) => (
                    <div
                        key={option.key}
                        className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5"
                    >
                        <div>
                            <h3 className="font-medium text-slate-800">
                                {option.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
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

                            <div className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-emerald-700"></div>

                            <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>
                        </label>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-2">
                <button
                    onClick={handleSave}
                    className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 active:bg-emerald-900"
                >
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default NotificationSettings;