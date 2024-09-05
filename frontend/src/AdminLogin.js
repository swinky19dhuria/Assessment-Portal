// src/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css'; // Assuming your existing styles are in this file

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // POST request to check admin credentials
    axios
      .post('http://localhost:8081/admin-login', credentials) // Make sure your backend route matches this path
      .then((res) => {
        if (res.data.Status === 'Success') {
          alert('Login Successful!');
          navigate('/admin-dashboard'); // Adjust the route based on your needs
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="content justify-content-center align-items-center d-flex shadow-lg admin-login">
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-4">
        <h1 className="header-text mb-4">Admin Login</h1>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="input-group mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control form-control-lg bg-light fs-6"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control form-control-lg bg-light fs-6"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button type="submit" className="btn btn-admin-login text-white w-50 fs-6">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
