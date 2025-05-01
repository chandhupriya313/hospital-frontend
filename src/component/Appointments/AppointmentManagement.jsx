import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AppointmentManagement.css';
import { format } from 'date-fns';  // Add date-fns for formatting

const AppointmentManagement = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      setError("Failed to load appointments.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}/status?status=Accepted`);
      fetchAppointments(); // Fetch the updated list of appointments
    } catch (error) {
      console.error("Failed to accept appointment:", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}/status?status=Cancelled`);
      fetchAppointments(); // Fetch the updated list of appointments
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    }
  };

  const handleReschedule = async (id, newDateTime) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}/reschedule?datetime=${newDateTime}`);
      fetchAppointments(); // Fetch the updated list of appointments
    } catch (error) {
      console.error("Failed to reschedule appointment:", error);
    }
  };

  const handleHome = () => {
    navigate('/Adminhome');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="appointment-container">
      <div className="top-bar">
        <button className="nav-button" onClick={handleHome}>🏠 Home</button>
        <button className="nav-button logout" onClick={handleLogout}>🚪 Logout</button>
      </div>

      <h2>Appointment Management</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Health Problem</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="6">No appointments available.</td>
            </tr>
          ) : (
            appointments.map((app) => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.age}</td>
                <td>{app.problem}</td>
                <td>
                  <input
                    type="datetime-local"
                    value={format(new Date(app.datetime), 'yyyy-MM-dd\'T\'HH:mm')}
                    onChange={(e) => handleReschedule(app.id, e.target.value)}
                  />
                </td>
                <td>{app.status}</td>
                <td>
                  <button onClick={() => handleAccept(app.id)}>Accept</button>
                  <button onClick={() => handleCancel(app.id)}>Cancel</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentManagement;
