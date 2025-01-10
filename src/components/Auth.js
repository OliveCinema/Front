import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "./Auth.css";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, { username, password });
      alert("Registration successful! Please log in.");
    } catch (err) {
      setError("Registration failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/login`, null, {
        params: { username, password },
      });
      alert("Login successful!");
      navigate("/movies");
    } catch (err) {
      setError("Login failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Olive Cinema</h1>
        <h2 className="auth-subtitle">Welcome Back!</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          className="auth-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="auth-buttons">
          <button className="auth-button register-button" onClick={handleRegister}>
            Register
          </button>
          <button className="auth-button login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
