import { useState } from "react";

import SettingsSidebar from "../../components/settings/SettingsSidebar";
import ProfileSettings from "../../components/settings/ProfileSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import AccountSettings from "../../components/settings/AccountSettings";
import AppearanceSettings from "../../components/settings/AppearanceSettings";
import DangerZone from "../../components/settings/DangerZone";

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
                return <AppearanceSettings />;

            case "danger":
                return <DangerZone />;

            default:
                return null;
        }
    };

    return (
        <div className="w-full">

            <div className="mx-auto max-w-4xl">
                <div className="mb-6 sm:mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] neu-accent">
                        Preferences
                    </p>

                    <h1
                        className="font-display mt-1 text-3xl sm:text-4xl font-medium neu-text tracking-tight"
                    >
                        Settings
                    </h1>

                    <p className="mt-2 neu-muted">
                        Manage your account, preferences, and application settings.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <SettingsSidebar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <div className="neu-card p-5 sm:p-8">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;