import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getProfile,
    updateProfile,
} from "../../services/settingsService";

const fieldClasses =
    "neu-input w-full h-12 px-4 py-3 transition-colors";

const FieldLabel = ({ children }) => (
    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] neu-muted">
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
            <div className="flex flex-col items-center justify-center gap-3 py-10 neu-muted">
                <div className="neu-inset-sm w-7 h-7 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: "var(--neu-accent)" }} />
                <p className="text-sm font-medium">Loading profile...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h2
                    className="font-display text-2xl font-medium neu-text tracking-tight"
                >
                    Profile
                </h2>

                <p className="mt-2 neu-muted">
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
                        className="neu-input w-full h-12 cursor-not-allowed px-4 py-3 neu-muted"
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
                        className={`${fieldClasses} h-auto resize-none`}
                    />
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={saving}
                        className="neu-btn neu-btn-accent h-12 w-full sm:w-auto px-8 py-3"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;