const Button = ({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    onClick,
    className = "",
}) => {
    const baseClasses =
        "rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
        success: "bg-green-600 text-white hover:bg-green-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-5 py-3",
        lg: "px-6 py-4 text-lg",
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
};

export default Button;