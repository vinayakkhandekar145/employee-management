
import { useState } from "react";
import { loginUser } from "../services/authService";
import "./Login.css";
import { useAuth } from "./context/AuthContext";

const Login = () => {
  const {login} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const user = await loginUser(email, password);
      login(user);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }


return (
  <div className="login-page">
    <div className="login-wrapper">

      {/* Left branding panel */}
      <div className="login-brand">
        <div className="brand-icon">
          <i className="bi bi-people-fill"></i>
        </div>

        <h1>Employee Management</h1>

        <p>
          One place to manage your team,
          track progress, and keep everything organized.
        </p>

        <div className="brand-illustration">
          <i className="bi bi-person-workspace"></i>
          <i className="bi bi-graph-up-arrow"></i>
          <i className="bi bi-people"></i>
        </div>

        <div className="brand-footer">
          <i className="bi bi-shield-check"></i>
          Your workspace, simplified.
        </div>
      </div>

      {/* Right login panel */}
      <div className="login-form-panel">
        <div className="login-heading-icon">
          <i className="bi bi-lock-fill"></i>
        </div>

        <h2>Welcome Back!</h2>
        <p className="login-subtitle">
          Please sign in to your account
        </p>

        <form onSubmit={handleSubmit} noValidate>

          {error && (
            <div className="alert alert-danger login-error">
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>

            <div className="input-group login-input">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>

              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <div className="input-group login-input">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>

              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
              />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>

            <span className="forgot-link">
              Need help?
            </span>
          </div>

          <button
            type="submit"
            className="btn login-btn w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Logging in...
              </>
            ) : (
              <>
                Login
                <i className="bi bi-arrow-right ms-2"></i>
              </>
            )}
          </button>

        </form>

        <div className="login-divider">
          <span>EMPLOYEE MANAGEMENT PORTAL</span>
        </div>

        <p className="login-bottom-text">
          Secure access to your employee dashboard
        </p>
      </div>

    </div>

    <p className="copyright">
      <i className="bi bi-shield-check me-2"></i>
      © 2026 Employee Management System
    </p>
  </div>
);

};

export default Login;
