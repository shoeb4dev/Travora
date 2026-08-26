import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";

function Login() {

    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] =
        useState(false);

    const redirectPath =
        location.state?.from || "/explore";

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.email || !form.password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await login({
                email: form.email,
                password: form.password,
            });

            navigate("/", { replace: true });
        } catch (error) {
            console.error("Login failed:", error);

            setError(
                error.response?.data?.message ||
                "Unable to login. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">

            <div className="auth-visual">
                <div className="auth-visual-overlay" />

                <div className="auth-visual-content">

                    <span className="auth-eyebrow">
                        WELCOME BACK
                    </span>

                    <h1>
                        The world
                        <br />
                        is waiting.
                    </h1>

                    <p>
                        Sign in to continue discovering places,
                        stories and experiences with Travora.
                    </p>

                </div>
            </div>

            <section className="auth-panel">

                <div className="auth-form-container">

                    <Link
                        to="/"
                        className="auth-logo"
                    >
                        Travora<span>.</span>
                    </Link>

                    <div className="auth-heading">

                        <span>
                            YOUR JOURNEY CONTINUES
                        </span>

                        <h2>
                            Welcome back
                        </h2>

                        <p>
                            Sign in to your Travora account.
                        </p>

                    </div>

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        <div className="form-field">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />

                        </div>

                        <div className="form-field">

                            <div className="password-label">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (previous) => !previous
                                        )
                                    }
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                            <input
                                id="password"
                                name="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />

                        </div>

                        <button
                            className="auth-submit"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign in"}

                            {!loading && <span>→</span>}
                        </button>

                    </form>

                    <p className="auth-switch">
                        Don't have an account?

                        <Link to="/signup">
                            Create an account
                        </Link>
                    </p>

                </div>

            </section>

        </main>
    );
}

export default Login;