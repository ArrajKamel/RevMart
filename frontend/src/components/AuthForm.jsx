// src/components/AuthForm.jsx
import React, { useState } from "react";
import "../styles/AuthForm.css";
import { signup, login } from "../services/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailScanConsent, setEmailScanConsent] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email, password });
        setMessage("Login successful!");
        // Redirect to hello page after successful login
        navigate("/hello");
      } else {
        await signup({ email, password, emailScanConsent });
        setMessage("Signup successful! Check your email to verify.");
      }
    } catch (err) {
      setMessage(err.message || "An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <label>
            <input
              type="checkbox"
              checked={emailScanConsent}
              onChange={(e) => setEmailScanConsent(e.target.checked)}
            />
            Agree to email scanning
          </label>
        )}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        <button type="button" className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
        {message && <div className="error-message">{message}</div>}
      </form>
    </div>
  );
}
