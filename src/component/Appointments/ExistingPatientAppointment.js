import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ExistingPatientAppointment.css';

const ExistingPatientAppointment = () => {
  const [patientName, setPatientName] = useState('');
  const [patientDob, setPatientDob] = useState('');
  const [records, setRecords] = useState(null);
  const [message, setMessage] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const navigate = useNavigate();

  const handleAppointmentSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/appointments/create', {
        patientName,
        patientDob,
        appointmentDate,
        appointmentTime,
      });

      if (Array.isArray(response.data)) {
        setRecords(response.data);
        setMessage('Existing appointments found.');
      } else {
        setRecords([response.data]);
        setMessage('Appointment booked successfully!');
      }
    } catch (error) {
      setMessage('Failed to book appointment. Please try again.');
    }
  };

  const handleNewDisease = () => {
    navigate('/PatientAppointmentForm');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/patientlogin');
  };

  return (
    <div className="existing-appointment-container">
      <div className="logout-bar">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <h2>Existing Patient Appointment</h2>

      <input
        type="text"
        placeholder="Enter Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Enter Date of Birth"
        value={patientDob}
        onChange={(e) => setPatientDob(e.target.value)}
      />
      <button onClick={handleAppointmentSubmit}>Book Appointment</button>

      {records && (
        <div className="record-display">
          <h3>Appointment Records</h3>
          {records.map((record, index) => (
            <div key={index}>
              <p><strong>Date:</strong> {record.appointmentDate}</p>
              <p><strong>Time:</strong> {record.appointmentTime}</p>
              <p><strong>Status:</strong> {record.status}</p>
              <hr />
            </div>
          ))}
        </div>
      )}

      <p>Is this a new disease? <button onClick={handleNewDisease}>Go to New Patient Form</button></p>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default ExistingPatientAppointment;
