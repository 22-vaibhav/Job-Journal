import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const OPTIONS = [
    {
        id: "light",
        label: "Light",
        description: "Classic bright interface",
        icon: Sun,
        preview: (
            // Mini mock of a light UI card
            <div className="rounded-lg border border-slate-200 bg-white p-2 space-y-1.5">
                <div className="h-2 w-2/3 rounded bg-slate-300" />
                <div className="h-1.5 w-full rounded bg-slate-100" />
                <div className="h-1.5 w-5/6 rounded bg-slate-100" />
                <div className="mt-2 h-4 w-1/2 rounded bg-emerald-200" />
            </div>
        ),
    },
    {
        id: "dark",
        label: "Dark",
        description: "Easy on the eyes at night",
        icon: Moon,
        preview: (
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-2 space-y-1.5">
                <div className="h-2 w-2/3 rounded bg-slate-600" />
                <div className="h-1.5 w-full rounded bg-slate-700" />
                <div className="h-1.5 w-5/6 rounded bg-slate-700" />
                <div className="mt-2 h-4 w-1/2 rounded bg-emerald-800" />
            </div>
        ),
    },
    {
        id: "system",
        label: "System",
        description: "Follows your OS setting",
        icon: Monitor,
        preview: (
            // Split half-light / half-dark
            <div className="rounded-lg border border-slate-200 overflow-hidden flex h-[64px]">
                <div className="flex-1 bg-white p-1.5 space-y-1">
                    <div className="h-1.5 w-full rounded bg-slate-200" />
                    <div className="h-1.5 w-4/5 rounded bg-slate-100" />
                    <div className="h-3 w-1/2 rounded bg-emerald-200 mt-1" />
                </div>
                <div className="flex-1 bg-slate-900 p-1.5 space-y-1">
                    <div className="h-1.5 w-full rounded bg-slate-600" />
                    <div className="h-1.5 w-4/5 rounded bg-slate-700" />
                    <div className="h-3 w-1/2 rounded bg-emerald-800 mt-1" />
                </div>
            </div>
        ),
    },
];

const AppearanceSettings = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2
                    className="text-2xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    Appearance
                </h2>

                <p className="mt-2 text-slate-500">
                    Choose how JobJournal looks for you. Your preference is saved locally.
                </p>
            </div>

            {/* Theme options */}
            <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Theme
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {OPTIONS.map(({ id, label, description, icon: Icon, preview }) => {
                        const isActive = theme === id;

                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setTheme(id)}
                                className={`relative flex flex-col gap-3 rounded-2xl border-2 p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/40 ${
                                    isActive
                                        ? "border-emerald-700 bg-emerald-50/60 shadow-sm"
                                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                                }`}
                            >
                                {/* Selected checkmark */}
                                {isActive && (
                                    <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-white">
                                        <Check size={11} strokeWidth={3} />
                                    </span>
                                )}

                                {/* Mini preview */}
                                <div className="w-full">{preview}</div>

                                {/* Label row */}
                                <div className="flex items-center gap-2">
                                    <Icon
                                        size={16}
                                        className={
                                            isActive
                                                ? "text-emerald-700"
                                                : "text-slate-400"
                                        }
                                    />
                                    <span
                                        className={`text-sm font-semibold ${
                                            isActive
                                                ? "text-emerald-700"
                                                : "text-slate-700"
                                        }`}
                                    >
                                        {label}
                                    </span>
                                </div>

                                <p className="text-xs text-slate-500 leading-relaxed">
                                    {description}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Current selection note */}
            <p className="text-xs text-slate-400">
                Currently using:{" "}
                <span className="font-medium text-slate-600 capitalize">{theme}</span> theme
            </p>
        </div>
    );
};

export default AppearanceSettings;
