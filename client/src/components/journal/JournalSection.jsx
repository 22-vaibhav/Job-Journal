import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import HelpToolTip from "../common/HelpToolTip";

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
                <span className="w-1.5 h-5 rounded-full neu-inset-sm" />

                <h2
                    className="font-display text-lg sm:text-xl font-medium tracking-tight neu-text"
                >
                    {title}
                </h2>

                {help && (
                    <HelpToolTip
                        title={help.title}
                        description={help.description}
                        examples={help.examples}
                        tips={help.tips}
                    />
                )}

                {items.length > 0 && (
                    <span className="neu-chip px-2.5 py-0.5 text-xs font-semibold neu-muted">
                        {items.length}
                    </span>
                )}
            </div>

            {items.length > 0 && (
                <div className="space-y-2">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="neu-raised-sm flex justify-between items-center gap-3 rounded-2xl px-4 py-3"
                        >
                            <span className="text-sm neu-text">{item}</span>
                            {!disabled && (
                                <button
                                    onClick={() => removeItem(index)}
                                    className="neu-btn neu-btn-danger flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
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
                        className="neu-input w-full h-12 pl-4 pr-16 text-sm"
                    />
                    <button
                        onClick={addItem}
                        aria-label={`Add to ${title}`}
                        className="neu-btn neu-btn-accent absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-xl"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            )}

        </div>
    );
};

export default JournalSection;