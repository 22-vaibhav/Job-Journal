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
                    className="block text-sm font-medium text-slate-700"
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
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          disabled:bg-slate-100
        "
            />
        </div>
    );
};

export default Input;