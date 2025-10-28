import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Use your environment variable (works in local & production)
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:7777";

  const handleAuth = async () => {
    try {
      if (isLogin) {
        // 🔹 Login
        const res = await axios.post(
          `${API_BASE}/api/login`,
          { emailId, password },
          { withCredentials: true }
        );
        console.log("Login success:", res.data);
        navigate("/");
      } else {
        // 🔹 Signup
        const res = await axios.post(
          `${API_BASE}/api/signup`,
          { emailId, password },
          { withCredentials: true }
        );
        console.log("Signup success:", res.data);
        alert("Signup successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error("Auth error:", err.response?.data || err.message);
      alert("Something went wrong!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!emailId || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    handleAuth();
  };

  return (
    <div className="front-page">
      <div className="navbar">
        <h2>QuickGpt</h2>
      </div>

      <div className="register">
        <h1 className="heading">{isLogin ? "Log in" : "Sign up"}</h1>
        <p>
          {isLogin
            ? "Welcome back! Please log in."
            : "Create an account to get smarter responses."}
        </p>

        {error && <p id="para" style={{ color: "red" }}>{error}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Id"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            id="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="input"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="input"
            />
          )}

          <button type="submit" className="log-btn">
            {isLogin ? "Log in" : "Sign Up"}
          </button>
        </form>

        <p>
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setIsLogin(true)}
              >
                Log in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
