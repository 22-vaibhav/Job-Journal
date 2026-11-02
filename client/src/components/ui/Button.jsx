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
    const baseClasses = "neu-btn";

    const variants = {
        primary: "neu-btn-accent",
        secondary: "",
        success: "neu-btn-accent",
        danger: "neu-btn-danger",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-lg",
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