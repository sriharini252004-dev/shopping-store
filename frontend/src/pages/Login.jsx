import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      const data = response.data;

      if (!data.token) {
        setError("Login response does not contain an authentication token.");
        return;
      }

      // Save login details
      localStorage.setItem("shopease-token", data.token);

      if (data.user) {
        localStorage.setItem(
          "shopease-user",
          JSON.stringify(data.user)
        );
      }

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        if (data.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 700);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      {/* Login Hero */}
      <section className="login-hero">
        {/* Left Side */}
        <div className="login-welcome">
          <span className="login-eyebrow">WELCOME BACK</span>

          <h1>
            Sign in to
            <span> ShopEase</span>
          </h1>

          <p className="login-welcome-description">
            Your favorite products, amazing offers and
            personalized shopping experience are just a login away!
          </p>

          <div className="login-benefits">
            <div className="login-benefit">
              <div className="login-benefit-icon">🛡️</div>

              <div>
                <h3>Secure Access</h3>
                <p>Your account is safe with us.</p>
              </div>
            </div>

            <div className="login-benefit">
              <div className="login-benefit-icon">🎁</div>

              <div>
                <h3>Exclusive Offers</h3>
                <p>Discover deals and discounts.</p>
              </div>
            </div>

            <div className="login-benefit">
              <div className="login-benefit-icon">💙</div>

              <div>
                <h3>Personalized Experience</h3>
                <p>Find products you will love.</p>
              </div>
            </div>
          </div>

          <div className="login-shopping-art">
            <div className="login-art-circle"></div>

            <div className="login-art-card login-art-card-one">
              🛍️
            </div>

            <div className="login-art-card login-art-card-two">
              🎁
            </div>

            <div className="login-art-card login-art-card-three">
              💙
            </div>

            <div className="login-shopping-emoji">🛒</div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="login-form-wrapper">
          <div className="login-card">
            <div className="login-brand">
              <div className="login-brand-icon">🛍️</div>
              <h2>ShopEase</h2>
            </div>

            <p className="login-card-subtitle">
              Login to continue your shopping journey
            </p>

            <form onSubmit={handleSubmit}>
              <div className="login-input-group">
                <label htmlFor="login-email">Email Address</label>

                <div className="login-input-box">
                  <span className="login-input-icon">✉</span>

                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="login-input-group">
                <label htmlFor="login-password">Password</label>

                <div className="login-input-box">
                  <span className="login-input-icon">🔒</span>

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="login-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                  />

                  <span>Remember me</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="login-forgot-link"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="login-alert login-alert-error">
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div className="login-alert login-alert-success">
                  ✓ {success}
                </div>
              )}

              <button
                type="submit"
                className="login-submit-button"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Login"}
                {!loading && <span>→</span>}
              </button>

              <div className="login-divider">
                <span></span>
                <p>OR</p>
                <span></span>
              </div>

              <button
                type="button"
                className="login-social-button"
                onClick={() =>
                  setError(
                    "Google login is not configured yet. Please use email and password."
                  )
                }
              >
                <span className="google-letter">G</span>
                Continue with Google
              </button>

              <button
                type="button"
                className="login-social-button"
                onClick={() =>
                  setError(
                    "Facebook login is not configured yet. Please use email and password."
                  )
                }
              >
                <span className="facebook-letter">f</span>
                Continue with Facebook
              </button>
            </form>

            <p className="login-register-text">
              Don't have an account?
              <Link to="/register"> Register</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Service Bar */}
      <section className="login-service-bar">
        <div className="login-service">
          <span>🚚</span>
          <div>
            <h3>Free Shipping</h3>
            <p>On orders over ₹999</p>
          </div>
        </div>

        <div className="login-service">
          <span>🛡️</span>
          <div>
            <h3>Secure Payment</h3>
            <p>Safe shopping experience</p>
          </div>
        </div>

        <div className="login-service">
          <span>↩️</span>
          <div>
            <h3>Easy Returns</h3>
            <p>Simple return process</p>
          </div>
        </div>

        <div className="login-service">
          <span>🎧</span>
          <div>
            <h3>Customer Support</h3>
            <p>We're here to help</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;