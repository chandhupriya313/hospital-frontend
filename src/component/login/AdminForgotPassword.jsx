import React, { useState } from 'react';
import axios from 'axios';
import './AdminForgotPassword.css';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/api/auth/forgot-password', {
        email,
        newPassword
      });

      setMessage(res.data);
      setEmail('');
      setNewPassword('');
    } catch (err) {
      setMessage(err.response?.data || 'Error resetting password.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Admin Forgot Password</h2>
      {message && <p className="response-message">{message}</p>}
      <form onSubmit={handleReset} className="forgot-password-form">
        <label htmlFor='name'>Email:</label>
        <input id="name" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor='pass'>New Password:</label>
        <input id="pass" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default AdminForgotPassword;
