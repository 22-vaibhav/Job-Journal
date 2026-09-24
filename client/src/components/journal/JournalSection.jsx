import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import HelpTooltip from "../common/HelpTooltip";

const JournalSection = ({ title, items, setItems, disabled, help, }) => {
    const [value, setValue] = useState("");

    const addItem = () => {
        if (!value.trim()) return;
        const updatedItems = [...items, value.trim()];
        setItems(updatedItems);
        setValue("");
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">

            <div className="flex items-center gap-3">
                <span className="w-1 h-5 rounded-full bg-emerald-700" />

                <h2
                    className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    {title}
                </h2>

                {help && (
                    <HelpTooltip
                        title={help.title}
                        description={help.description}
                        examples={help.examples}
                        tips={help.tips}
                    />
                )}

                {items.length > 0 && (
                    <span className="text-xs font-medium text-slate-400">
                        {items.length}
                    </span>
                )}
            </div>

            {items.length > 0 && (
                <div className="space-y-2">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3"
                        >
                            <span className="text-sm text-slate-700">{item}</span>
                            {!disabled && (
                                <button
                                    onClick={() => removeItem(index)}
                                    className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
                                    aria-label={`Remove ${item}`}
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {!disabled && (
                <div className="relative">
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addItem();
                            }
                        }}
                        placeholder={`Add ${title}`}
                        className="w-full rounded-xl border border-slate-200 pl-4 pr-11 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700/60 transition-colors"
                    />
                    <button
                        onClick={addItem}
                        aria-label={`Add to ${title}`}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            )}

        </div>
    );
};

export default JournalSection;