
import { useState } from "react";
import "./App.css";
import axios from "axios";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    async function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};

        setServerError("");
        setSuccessMessage("");

        // Frontend validation
        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/login",
                {
                    email: email.trim(),
                    password: password,
                }
            );

            if (response.data.success) {
                onLogin(response.data.user);
            }
        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                "Unable to connect to the server. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }



    return (
        <main className="login-page">
            <section className="brand-panel">
                <div className="brand-logo">
                    <span className="logo-icon">✦</span>
                    <span>NEXORA</span>
                </div>

                <div className="brand-content">
                    <div className="visual-orbit">
                        <div className="orbit orbit-one"></div>
                        <div className="orbit orbit-two"></div>
                        <div className="orbit-center">✦</div>
                        <span className="floating-star star-one">✧</span>
                        <span className="floating-star star-two">✦</span>
                    </div>

                    <p className="eyebrow">YOUR SPACE TO CREATE</p>
                    <h1>
                        A little more
                        <br />
                        room to <em>grow.</em>
                    </h1>
                    <p className="brand-description">
                        A thoughtful space for your ideas, your progress,
                        and everything you're becoming.
                    </p>
                </div>

                <p className="brand-footer">
                    Made for curious minds. © 2026 NEXORA
                </p>
            </section>

            <section className="form-panel">
                <div className="mobile-brand">✦ NEXORA</div>

                <div className="login-container">
                    <div className="welcome-label">
                        <span className="welcome-dot"></span>
                        YOUR WORKSPACE AWAITS
                    </div>

                    <h2>Welcome back<span className="period">.</span></h2>
                    <p className="subtitle">
                        Pick up right where your inspiration left off.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <p className="error-message">{errors.email}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <div className="label-row">
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="password-wrapper">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={
                                        showPassword ? "Hide password" : "Show password"
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="error-message">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in to workspace"}
                            <span>→</span>
                        </button>

                        {serverError && (
                            <p className="server-error" role="alert">
                                {serverError}
                            </p>
                        )}
                        {successMessage && (
                            <p className="success-message" role="status">
                                {successMessage}
                            </p>
                        )}

                        <div className="login-divider">
                            <span></span>
                            <p>A SPACE THAT'S YOURS</p>
                            <span></span>
                        </div>

                        <p className="demo-note">
                            This is a demonstration workspace created for learning.
                        </p>
                    </form>
                </div>

                <p className="form-footer">
                    Designed with intention. Built with curiosity.
                </p>
            </section>
        </main>
    );
}

export default Login;
