import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });


      console.log('Login success:', response.data);


      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }


      navigate('/AdminHome');

    } catch (error) {

      if (error.response) {

        setError(error.response.data || 'Login failed');
      } else if (error.request) {

        setError('Network error. Please try again later.');
      } else {

        setError('Something went wrong. Please try again.');
      }
      console.error('Login error:', error.response?.data);
    } finally {
      setLoading(false);
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
        /><br /> <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        {error && <div className="error-message">{error}</div>} <br />
        <button type="submit">{loading ? 'Logging in...' : 'Login'}</button><br />
        <div className="forgot-password"><br />
          <a href="/AdminForgotPassword">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
