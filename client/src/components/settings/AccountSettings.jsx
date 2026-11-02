import { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../../services/settingsService";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";

const fieldClasses =
    "neu-input w-full h-12 px-4 py-3 pr-12 transition-colors";

const FieldLabel = ({ children }) => (
    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] neu-muted">
        {children}
    </label>
);

const AccountSettings = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.currentPassword) {
            return toast.error("Current password is required.");
        }

        if (formData.newPassword.length < 8) {
            return toast.error(
                "New password must be at least 8 characters."
            );
        }

        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("Passwords do not match.");
        }

        try {
            setLoading(true);

            await changePassword(formData);

            toast.success("Password updated successfully.");

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setShowPassword({
                current: false,
                new: false,
                confirm: false,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update password."
            );
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <div className="space-y-8">
            <div>
                <h2
                    className="font-display text-2xl font-medium neu-text tracking-tight"
                >
                    Account Settings
                </h2>

                <p className="mt-2 neu-muted">
                    Update your account password to keep your account secure.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-xl space-y-6"
            >
                <div>
                    <FieldLabel>Current Password</FieldLabel>

                    <div className="relative">
                        <input
                            type={showPassword.current ? "text" : "password"}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className={fieldClasses}
                        />

                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility("current")}
                            className="neu-link absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl neu-muted" aria-label="Show or hide password"
                        >
                            {showPassword.current ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <FieldLabel>New Password</FieldLabel>

                    <div className="relative">
                        <input
                            type={showPassword.new ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className={fieldClasses}
                        />

                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility("new")}
                            className="neu-link absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl neu-muted" aria-label="Show or hide password"
                        >
                            {showPassword.new ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <FieldLabel>Confirm New Password</FieldLabel>

                    <div className="relative">
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={fieldClasses}
                        />

                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility("confirm")}
                            className="neu-link absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl neu-muted" aria-label="Show or hide password"
                        >
                            {showPassword.confirm ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="neu-btn neu-btn-accent h-12 w-full sm:w-auto px-8 py-3"
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>

            <div className="neu-inset rounded-2xl p-5">
                <div className="flex items-center gap-2">
                    <ShieldAlert size={17} className="neu-warn" />
                    <h3 className="font-semibold neu-text">
                        Password Tips
                    </h3>
                </div>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm neu-muted">
                    <li>Use at least 8 characters.</li>
                    <li>Include uppercase, lowercase and numbers.</li>
                    <li>Avoid using your previous passwords.</li>
                    <li>Do not share your password with anyone.</li>
                </ul>
            </div>
        </div>
    );
};

export default AccountSettings;