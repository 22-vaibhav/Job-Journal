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
        <Card className="neu-glass w-full max-w-md p-6 sm:p-10">

            <div className="text-center">

                <span
                    className="neu-raised inline-flex items-center justify-center w-14 h-14 rounded-[1.1rem] neu-accent font-display text-2xl font-semibold mb-4"
                >
                    J
                </span>

                <h1
                    className="font-display text-3xl sm:text-4xl font-medium tracking-tight neu-text"
                >
                    JobJournal
                </h1>

                <p className="neu-muted mt-2 text-sm">
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
                    className="w-full h-12"
                >
                    Login
                </Button>
            </form>

            <p className="mt-6 text-center text-sm neu-muted">
                Don't have an account?{" "}
                <Link
                    to={ROUTES.REGISTER}
                    className="neu-accent font-semibold underline underline-offset-4"
                >
                    Register
                </Link>
            </p>

        </Card>
    );
};

export default LoginForm;