import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const {
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await signup({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Signup failed:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to create your account. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <div className="signup-header">
          <div className="signup-logo">
            ✦
          </div>

          <h1>Join Travora</h1>

          <p>
            Create your account and start
            exploring the world.
          </p>
        </div>

        <form
          className="signup-form"
          onSubmit={handleSubmit}
        >

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">
              Full name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="signup-submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create account"}
          </button>

        </form>

        <div className="signup-footer">
          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Log in
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Signup;