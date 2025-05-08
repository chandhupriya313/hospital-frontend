import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    profession: '',
    specialization: '',
    workingDays: '',
    workingHours: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchDoctors = useCallback(async () => {
    try {
      await axios.get('http://localhost:8080/doctor/all');
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/doctor/add', newDoctor);
      setMessage('Doctor added successfully');
      setNewDoctor({
        name: '',
        profession: '',
        specialization: '',
        workingDays: '',
        workingHours: ''
      });
      fetchDoctors();
    } catch (err) {
      console.error('Error adding doctor:', err);
      setMessage('Failed to add doctor');
    }
  };

  const handleHome = () => {
    navigate('/AdminHome');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/mainpage');
  };

  return (
    <div className="doctor-dashboard">
      <header className="dashboard-header">
        <h2>Doctor Dashboard</h2>
        <div className="nav-buttons">
          <button onClick={handleHome}>Home</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <form className="add-doctor-form" onSubmit={handleAddDoctor}>
        <h3>Add Doctor</h3>

        <label htmlFor="text"><b>Doctor Name:</b></label>
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={newDoctor.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="text"><b>Profession:</b></label>
        <input
          type="text"
          name="profession"
          placeholder="Profession"
          value={newDoctor.profession}
          onChange={handleChange}
          required
        />

        <label htmlFor="text"><b>Specialization:</b></label>
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={handleChange}
          required
        />

        <label htmlFor="text"><b>Working Days:</b></label>
        <input
          type="text"
          name="workingDays"
          placeholder="Working Days (e.g. Mon-Fri)"
          value={newDoctor.workingDays}
          onChange={handleChange}
          required
        />

        <label htmlFor="text"><b>Working Hours:</b></label>
        <input
          type="text"
          name="workingHours"
          placeholder="Working Hours (e.g. 10am - 4pm)"
          value={newDoctor.workingHours}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Doctor</button>
      </form>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default DoctorDashboard;
