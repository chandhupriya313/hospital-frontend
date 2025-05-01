import React, { useState } from 'react';
import axios from 'axios';
import './NewPatient.css'; // Optional for styling

const NewPatientAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    healthProblem: '',
    date: '',
    time: '',
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
      const response = await axios.post('http://localhost:8080/api/appointments/new', formData);
      setMessage('Appointment booked successfully!');
      setFormData({
        name: '',
        age: '',
        healthProblem: '',
        date: '',
        time: '',
      });
    } catch (error) {
      setMessage('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>New Patient Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="healthProblem"
          placeholder="Health Problem"
          value={formData.healthProblem}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <button type="submit" className="book-btn">Book Appointment</button>
      </form>
      {message && <p className="appointment-message">{message}</p>}
    </div>
  );
};

export default NewPatientAppointment;
