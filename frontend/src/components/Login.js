import React, { useState } from 'react';
import { login } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      toast.success('Login successful');
      // Save the token in local storage or context
      localStorage.setItem('token', response.token);
      navigate('/'); // Redirect to home page
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/signup" className="signup-link">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;