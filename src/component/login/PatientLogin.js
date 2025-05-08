import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLogin.css';

const PatientLogin = () => {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState(''); // Date of Birth (yyyy-MM-dd)
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Format DOB to yyyy-MM-dd
      const formattedDob = new Date(dob).toISOString().split('T')[0];

      const response = await axios.post('http://localhost:8080/hosp/login', {
        username,
        dob: formattedDob,
      });

      if (response.data === 'Login successful') {
        setMessage('Login successful');
        localStorage.setItem('username', username); // Store for profile fetch
        navigate('/patientdashboard');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Patient Login</h2>
      <form onSubmit={handleLogin} className="patient-login-form">
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <br />
        <button className="adminbutton" type="submit">Login</button>
      </form>

      {message && <p className="patient-login-message">{message}</p>}

      <p className="register-link">
        New user? <Link to="/PatientRegistration"><strong>Register here</strong></Link>
      </p>
    </div>
  );
};

export default PatientLogin;
