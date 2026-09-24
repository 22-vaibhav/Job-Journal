import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getProfile,
    updateProfile,
} from "../../services/settingsService";

const fieldClasses =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700/60 transition-colors";

const FieldLabel = ({ children }) => (
    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
        {children}
    </label>
);

const ProfileSettings = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        currentCompany: "",
        currentRole: "",
        experience: 0,
        careerGoal: "",
    });

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await getProfile();

            setFormData({
                name: response.data.name || "",
                email: response.data.email || "",
                currentCompany: response.data.currentCompany || "",
                currentRole: response.data.currentRole || "",
                experience: response.data.experience || 0,
                careerGoal: response.data.careerGoal || "",
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.type === "number"
                    ? Number(e.target.value)
                    : e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await updateProfile({
                name: formData.name,
                currentCompany: formData.currentCompany,
                currentRole: formData.currentRole,
                experience: formData.experience,
                careerGoal: formData.careerGoal,
            });

            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-slate-500">
                <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-t-emerald-700 animate-spin" />
                <p className="text-sm font-medium">Loading profile...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h2
                    className="text-2xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    Profile
                </h2>

                <p className="mt-2 text-slate-500">
                    Update your personal and professional details.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <FieldLabel>Full Name</FieldLabel>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={fieldClasses}
                    />
                </div>

                <div>
                    <FieldLabel>Email</FieldLabel>

                    <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <FieldLabel>Current Company</FieldLabel>

                        <input
                            type="text"
                            name="currentCompany"
                            value={formData.currentCompany}
                            onChange={handleChange}
                            className={fieldClasses}
                        />
                    </div>

                    <div>
                        <FieldLabel>Current Role</FieldLabel>

                        <input
                            type="text"
                            name="currentRole"
                            value={formData.currentRole}
                            onChange={handleChange}
                            className={fieldClasses}
                        />
                    </div>
                </div>

                <div>
                    <FieldLabel>Experience (Years)</FieldLabel>

                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        min="0"
                        className={fieldClasses}
                    />
                </div>

                <div>
                    <FieldLabel>Career Goal</FieldLabel>

                    <textarea
                        rows="4"
                        name="careerGoal"
                        value={formData.careerGoal}
                        onChange={handleChange}
                        className={`${fieldClasses} resize-none`}
                    />
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 active:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;