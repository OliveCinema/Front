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
      await axios.post(`${API_BASE_URL}/auth/register`, { username, password });
      alert("Registration successful! Please log in.");
    } catch (err) {
      setError("Registration failed: " + err.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/login?username=${username}&password=${password}`);
      alert("Login successful!");
      navigate("/movies");
    } catch (err) {
      setError("Login failed: " + err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Auth</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Auth;
