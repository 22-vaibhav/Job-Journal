import { SETTINGS_TABS } from "../../constants/settingsTabs";

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
    return (
        <aside className="w-full rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:w-72 h-fit">
            <h2
                className="mb-4 px-1 text-lg font-semibold text-slate-900 tracking-tight"
                style={{ fontFamily: "'Fraunces', serif" }}
            >
                Settings
            </h2>

            <nav className="space-y-1.5">
                {SETTINGS_TABS.map((tab) => {
                    const Icon = tab.icon;

                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${isActive
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "text-slate-600 border border-transparent hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <Icon size={18} className={isActive ? "text-emerald-700" : "text-slate-400"} />

                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default SettingsSidebar;