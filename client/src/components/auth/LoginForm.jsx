import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { loginUser } from "../../services/authService";
import { saveToken } from "../../utils/auth";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
    const navigate = useNavigate();

    const { refreshProfile } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setFormData((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            const response = await loginUser(formData);

            saveToken(response.token);
            await refreshProfile();

            toast.success("Welcome back!");

            navigate(ROUTES.JOURNEY);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md p-8 sm:p-10">

            <div className="text-center">

                <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-white text-lg font-bold mb-4"
                    style={{
                        background: "linear-gradient(135deg, #0F6B5C 0%, #1B9C87 100%)",
                    }}
                >
                    J
                </span>

                <h1
                    className="text-3xl font-semibold text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    JobJournal
                </h1>

                <p className="text-slate-500 mt-2 text-sm">
                    Your Professional Journey,
                    One Day at a Time
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
            >
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />

                <Button
                    type="submit"
                    loading={loading}
                    className="w-full"
                >
                    Login
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                    to={ROUTES.REGISTER}
                    className="text-emerald-700 font-medium hover:text-emerald-800 hover:underline"
                >
                    Register
                </Link>
            </p>

        </Card>
    );
};

export default LoginForm;