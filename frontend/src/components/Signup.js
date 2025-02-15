import React, { useState } from 'react';
import { signup } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file
import { toast } from 'react-toastify';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(username, password);
      localStorage.setItem('token', response.token);
      navigate('/');
      toast.success('Signup successful');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="signup-form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="signup-button">Signup</button>
      </form>
      <p>Already have an account? <Link to="/" className="login-link">Login</Link></p>
    </div>
  );
};

export default Signup;
