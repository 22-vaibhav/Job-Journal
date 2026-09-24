import { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../../services/settingsService";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";

const fieldClasses =
    "w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-slate-900 " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700/60 transition-colors";

const FieldLabel = ({ children }) => (
    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
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
                    className="text-2xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    Account Settings
                </h2>

                <p className="mt-2 text-slate-500">
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
                            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
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
                            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
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
                            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
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
                    className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-center gap-2">
                    <ShieldAlert size={17} className="text-amber-700" />
                    <h3 className="font-semibold text-amber-900">
                        Password Tips
                    </h3>
                </div>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-amber-800">
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