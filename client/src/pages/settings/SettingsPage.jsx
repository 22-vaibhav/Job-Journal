import { useState } from "react";

import SettingsSidebar from "../../components/settings/SettingsSidebar";
import ProfileSettings from "../../components/settings/ProfileSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import AccountSettings from "../../components/settings/AccountSettings";

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState("profile");

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return <ProfileSettings />;

            case "account":
                return <AccountSettings />;

            case "notifications":
                return <NotificationSettings />;

            case "appearance":
                return (
                    <div>
                        <h2
                            className="text-2xl font-semibold text-slate-900 tracking-tight"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Appearance
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Customize the look and feel of ResumeLog AI.
                        </p>
                    </div>
                );

            case "danger":
                return (
                    <div>
                        <h2
                            className="text-2xl font-semibold text-red-600 tracking-tight"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Danger Zone
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Permanently delete your ResumeLog AI account.
                        </p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-8 sm:py-10">

            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');`}
            </style>

            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                        Preferences
                    </p>

                    <h1
                        className="mt-1 text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Settings
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage your account, preferences, and application settings.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                    <SettingsSidebar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <div className="rounded-2xl border border-slate-200/70 bg-white p-6 sm:p-8 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-8px_rgba(16,24,40,0.10)]">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;