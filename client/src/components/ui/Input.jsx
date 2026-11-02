const Input = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-xs font-semibold uppercase tracking-[0.08em] neu-muted"
                >
                    {label}
                </label>
            )}

            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className="
          neu-input
          w-full
          px-4
          py-3
          transition
        "
            />
        </div>
    );
};

export default Input;