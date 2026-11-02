import { SETTINGS_TABS } from "../../constants/settingsTabs";

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
    return (
        <aside className="w-full h-fit">
            {/* Horizontal pill tabs at every breakpoint (the app sidebar is already on the left) */}
            <nav
                aria-label="Settings sections"
                className="flex flex-wrap gap-4 pb-1"
            >
                {SETTINGS_TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            aria-current={isActive ? "page" : undefined}
                            className={`neu-link flex h-11 shrink-0 items-center gap-2 px-5 text-sm ${
                                isActive ? "neu-active" : ""
                            } ${tab.id === "danger" ? "neu-danger" : ""}`}
                        >
                            <Icon size={16} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default SettingsSidebar;