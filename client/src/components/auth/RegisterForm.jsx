import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Camera } from "lucide-react";

import { ROUTES } from "../../constants/routes";
import { registerUser } from "../../services/authService";

const fieldClasses =
    "neu-input w-full h-12 px-4 text-sm";

const SectionLabel = ({ children }) => (
    <div className="flex items-center gap-3 mb-4">
        <span className="neu-inset-sm w-1.5 h-5 rounded-full" />
        <h2
            className="font-display text-lg font-medium tracking-tight neu-text"
        >
            {children}
        </h2>
    </div>
);

const RegisterForm = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profilePreview, setProfilePreview] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        currentCompany: "",
        currentRole: "",
        experience: "",
        careerGoal: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setProfileImage(file);
        setProfilePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            toast.error("Please fill all required fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("currentCompany", formData.currentCompany);
            data.append("currentRole", formData.currentRole);
            data.append(
                "experience",
                Number(formData.experience) || 0
            );
            data.append("careerGoal", formData.careerGoal);

            if (profileImage) {
                data.append("profileImage", profileImage);
            }

            await registerUser(data);

            toast.success("Registration successful.");

            navigate(ROUTES.LOGIN);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-9"
        >

            {/* Profile Picture */}

            <div className="flex flex-col items-center">
                <div className="relative">

                    <div
                        className="neu-inset w-28 h-28 rounded-full flex items-center justify-center overflow-hidden neu-accent"
                    >
                        {profilePreview ? (
                            <img
                                src={profilePreview}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Camera size={30} />
                        )}
                    </div>

                    <label
                        htmlFor="profileImage"
                        className="neu-btn neu-btn-accent absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full"
                    >
                        <Camera size={16} />
                    </label>

                    <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        className="hidden"
                    />
                </div>

                <p className="mt-3 text-sm neu-muted">
                    Profile Picture <span className="neu-muted">(Optional)</span>
                </p>
            </div>

            {/* Personal Information */}

            <div>

                <SectionLabel>Personal Information</SectionLabel>

                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={handleChange}
                        className={fieldClasses}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                        className={fieldClasses}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password *"
                        value={formData.password}
                        onChange={handleChange}
                        className={fieldClasses}
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password *"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={fieldClasses}
                    />

                </div>

            </div>

            {/* Professional Information */}

            <div>

                <div className="flex items-center gap-3 mb-4">
                    <span className="neu-inset-sm w-1.5 h-5 rounded-full" />
                    <h2
                        className="font-display text-lg font-medium tracking-tight neu-text"
                    >
                        Professional Information
                        <span className="text-sm neu-muted font-normal ml-2">
                            (Optional)
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        type="text"
                        name="currentCompany"
                        placeholder="Current Company"
                        value={formData.currentCompany}
                        onChange={handleChange}
                        className={fieldClasses}
                    />

                    <input
                        type="text"
                        name="currentRole"
                        placeholder="Current Role"
                        value={formData.currentRole}
                        onChange={handleChange}
                        className={fieldClasses}
                    />

                    <input
                        type="number"
                        name="experience"
                        placeholder="Years of Experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className={fieldClasses}
                    />

                    <input
                        type="text"
                        name="careerGoal"
                        placeholder="Career Goal"
                        value={formData.careerGoal}
                        onChange={handleChange}
                        className={fieldClasses}
                    />

                </div>

            </div>

            <button
                type="submit"
                disabled={loading}
                className="neu-btn neu-btn-accent w-full h-12 flex items-center justify-center gap-2 rounded-2xl"
            >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm neu-muted">

                Already have an account?{" "}

                <Link
                    to={ROUTES.LOGIN}
                    className="neu-accent font-semibold underline underline-offset-4"
                >
                    Sign In
                </Link>

            </p>

        </form>

    );

};

export default RegisterForm;