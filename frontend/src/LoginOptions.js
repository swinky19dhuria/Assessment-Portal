// src/LoginOptions.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Assuming you are using the existing styles

function LoginOptions() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    // Add navigation logic for admin login if needed
    alert("Admin functionality coming soon")
  };
  
  const handleUserLogin = () => {
    navigate('/register'); // Navigate to the LoginRegister page when "Login as User" is clicked
  };

  return (
    <div className="login-options-container">
      <div className="left-section">
        <div className="logo-box">
          <img src="path_to_logo" alt="Take Test Logo" />
          <h1>Take Test</h1>
        </div>
      </div>
      <div className="right-section">
        <h1>TAKE TEST</h1>
        <p>ONLINE ASSESSMENT PORTAL</p>
        <button className="btn-admin" onClick={handleAdminLogin}>
          Login as Admin
        </button>
        <button className="btn-user" onClick={handleUserLogin}>
          Login as User
        </button>
      </div>
    </div>
  );
}

export default LoginOptions;
