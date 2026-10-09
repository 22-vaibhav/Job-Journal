import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Camera } from "lucide-react";

import { ROUTES } from "../../constants/routes";
import { registerUser } from "../../services/authService";

const fieldClasses =
    "w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder:text-slate-400 " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700/60 transition-colors";

const SectionLabel = ({ children }) => (
    <div className="flex items-center gap-3 mb-4">
        <span className="w-1 h-5 rounded-full bg-emerald-700" />
        <h2
            className="text-lg font-semibold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
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
                        className="w-28 h-28 rounded-full flex items-center justify-center overflow-hidden text-white shadow-md"
                        style={{
                            background:
                                "linear-gradient(135deg, #0F6B5C 0%, #1B9C87 100%)",
                        }}
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
                        className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-md cursor-pointer transition-all duration-200 hover:scale-110 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 hover:shadow-lg"
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

                <p className="mt-3 text-sm text-slate-500">
                    Profile Picture <span className="text-slate-400">(Optional)</span>
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
                    <span className="w-1 h-5 rounded-full bg-emerald-700" />
                    <h2
                        className="text-lg font-semibold text-slate-900 tracking-tight"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Professional Information
                        <span className="text-sm text-slate-400 font-normal ml-2">
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
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-xl py-3 font-semibold transition-colors"
            >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-slate-600">

                Already have an account?{" "}

                <Link
                    to={ROUTES.LOGIN}
                    className="text-emerald-700 font-medium hover:text-emerald-800 hover:underline"
                >
                    Sign In
                </Link>

            </p>

        </form>

    );

};

export default RegisterForm;