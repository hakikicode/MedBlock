import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorLogin.css";

const DoctorLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Define the fixed password here
  const correctPassword = "doctor123"; 

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear error on input change
  };

  const handleLogin = () => {
    if (password === correctPassword) {
      navigate("/Doctor");
    } else {
      setError("Password is incorrect. Please try again.");
    }
  };

  return (
    <div className="doctor-login-container">
      <h2 className="title">Doctor Authentication</h2>
      <div className="login-form">
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
          className="password-input"
        />
        <button onClick={handleLogin} className="login-button">Log In</button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default DoctorLogin;
