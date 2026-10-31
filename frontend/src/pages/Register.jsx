import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      const data = response.data;

      // Store login details only if the backend returns a token.
      if (data.token) {
        localStorage.setItem("shopease-token", data.token);

        if (data.user) {
          localStorage.setItem(
            "shopease-user",
            JSON.stringify(data.user)
          );
        }
      }

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate(data.token ? "/" : "/login");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        {/* Left Side */}
        <div className="register-left">
          <div className="register-brand">
            <span className="register-brand-icon">🛍️</span>
            <span>
              Shop<span>Ease</span>
            </span>
          </div>

          <div className="register-welcome">
            <span className="register-label">JOIN SHOPEASE</span>

            <h1>
              Your next
              <br />
              favorite find
              <br />
              <span>starts here.</span>
            </h1>

            <p>
              Create your account and discover amazing products,
              exciting offers, and a better shopping experience.
            </p>

            <div className="register-benefits">
              <div>
                <span className="benefit-check">✓</span>
                Quality products
              </div>

              <div>
                <span className="benefit-check">✓</span>
                Easy and secure shopping
              </div>

              <div>
                <span className="benefit-check">✓</span>
                Track your orders easily
              </div>
            </div>
          </div>

          <div className="register-left-footer">
            Your shopping journey begins with us.
          </div>
        </div>

        {/* Right Side */}
        <div className="register-right">
          <div className="register-heading">
            <h2>Create Account</h2>
            <p>Enter your details to get started.</p>
          </div>

          {error && (
            <div className="register-alert register-error">
              {error}
            </div>
          )}

          {success && (
            <div className="register-alert register-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-field">
              <label htmlFor="register-name">Full Name</label>

              <input
                id="register-name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="register-email">Email Address</label>

              <input
                id="register-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="register-password">Password</label>

              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="register-confirm-password">
                Confirm Password
              </label>

              <input
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <label className="register-show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show password
            </label>

            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          <div className="register-divider">
            <span>ALREADY HAVE AN ACCOUNT?</span>
          </div>

          <p className="register-login-text">
            Welcome back!{" "}
            <Link to="/login">Sign in</Link>
          </p>

          <p className="register-terms">
            By creating an account, you agree to our shopping
            terms and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;