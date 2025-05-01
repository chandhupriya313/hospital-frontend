import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLogin.css';

const PatientLogin = () => {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState(''); // Date of Birth (format: yyyy-mm-dd)
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/hosp/login', {
        username,
        dob,
      });

      if (response.data === 'Login successful') {
        setMessage('Login successful');
        navigate('/patientdashboard');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
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
          /> <br />
        </div> <dr />
        <div>
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          /> 
        </div> <br />
        <button className="adminbutton" type="submit">Login</button> 
      </form>

      {message && <p className="patient-login-message">{message}</p>}

      <p className="register-link">
        New user? <Link to="/patientregestration"><strong>Register here</strong></Link>
      </p>
    </div>
  );
};

export default PatientLogin;
