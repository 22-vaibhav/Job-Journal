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
            <div className="rounded-lg border border-[#e2e8f0] bg-[#ffffff] p-2 space-y-1.5">
                <div className="h-2 w-2/3 rounded bg-[#cbd5e1]" />
                <div className="h-1.5 w-full rounded bg-[#f1f5f9]" />
                <div className="h-1.5 w-5/6 rounded bg-[#f1f5f9]" />
                <div className="mt-2 h-4 w-1/2 rounded bg-[#a7f3d0]" />
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
            <div className="rounded-lg border border-[#e2e8f0] overflow-hidden flex h-[64px]">
                <div className="flex-1 bg-[#ffffff] p-1.5 space-y-1">
                    <div className="h-1.5 w-full rounded bg-[#e2e8f0]" />
                    <div className="h-1.5 w-4/5 rounded bg-[#f1f5f9]" />
                    <div className="h-3 w-1/2 rounded bg-[#a7f3d0] mt-1" />
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
                    className="font-display text-2xl font-medium neu-text tracking-tight"
                >
                    Appearance
                </h2>

                <p className="mt-2 neu-muted">
                    Choose how JobJournal looks for you. Your preference is saved locally.
                </p>
            </div>

            {/* Theme options */}
            <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] neu-muted">
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
                                className={`neu-btn relative flex flex-col gap-3 rounded-2xl p-4 text-left ${
                                    isActive ? "neu-pressed" : ""
                                }`}
                                aria-pressed={isActive}
                            >
                                {/* Selected checkmark */}
                                {isActive && (
                                    <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--neu-accent)] text-[var(--neu-accent-ink)]">
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
                                                ? "neu-accent"
                                                : "neu-muted"
                                        }
                                    />
                                    <span
                                        className={`text-sm font-semibold ${
                                            isActive
                                                ? "neu-accent"
                                                : "neu-text"
                                        }`}
                                    >
                                        {label}
                                    </span>
                                </div>

                                <p className="text-xs neu-muted font-normal leading-relaxed">
                                    {description}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Current selection note */}
            <p className="text-xs neu-muted">
                Currently using:{" "}
                <span className="font-medium neu-text capitalize">{theme}</span> theme
            </p>
        </div>
    );
};

export default AppearanceSettings;