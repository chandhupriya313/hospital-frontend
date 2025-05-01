import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate for redirecting
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // For showing loading indicator
  const navigate = useNavigate(); // Used to navigate to another page

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      // Handle successful login
      console.log('Login success:', response.data);

      // If the response contains a token, save it to localStorage (optional)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      // Redirect to the AdminHome page upon successful login
      navigate('/AdminHome'); // Change '/AdminHome' to the desired page route

    } catch (error) {
      // Handle login errors
      if (error.response) {
        // Server-side error (e.g., invalid credentials)
        setError(error.response.data || 'Login failed');
      } else if (error.request) {
        // Network error or no response from the server
        setError('Network error. Please try again later.');
      } else {
        // Other errors
        setError('Something went wrong. Please try again.');
      }
      console.error('Login error:', error.response?.data);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>} <br />
        <button type="submit">{loading ? 'Logging in...' : 'Login'}</button>
        <div className="forgot-password">
          <a href="/AdminForgotPassword">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
