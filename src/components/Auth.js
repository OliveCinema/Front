import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Olive Cinema - Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleRegister}>
          Register
        </button>
        <button className="btn btn-success" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Auth;
