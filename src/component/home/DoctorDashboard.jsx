import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    profession: '',
    specialization: '',
    workingDays: '',
    workingHours: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch all doctors from backend on component load
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:8080/doctor/all'); // Adjust if your endpoint differs
      setDoctors(res.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

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
      await axios.post('http://localhost:8080/doctor/add', newDoctor); // Adjust endpoint as needed
      setMessage('Doctor added successfully');
      navigate('/DoctorListPage');
      setNewDoctor({
        name: '',
        profession: '',
        specialization: '',
        workingDays: '',
        workingHours: ''
      });
      fetchDoctors(); // Refresh list after adding
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
    navigate('/login');
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
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={newDoctor.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="profession"
          placeholder="Profession"
          value={newDoctor.profession}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="workingDays"
          placeholder="Working Days (e.g. Mon-Fri)"
          value={newDoctor.workingDays}
          onChange={handleChange}
          required
        />
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
