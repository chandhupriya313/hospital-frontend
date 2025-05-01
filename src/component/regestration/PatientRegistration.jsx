import React, { useState } from 'react';
import axios from 'axios';
import './PatientRegistration.css'; // Import your styles

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    dob: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/hosp/register', formData);
      setMessage('Registration successful!');
      setFormData({ username: '', dob: '' });
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    
    <div className="login">
    <p>already have an account?<a href="/login"><strong>Login </strong></a></p>
    
  </div>
   </div>
  );
};

export default PatientRegistration;
