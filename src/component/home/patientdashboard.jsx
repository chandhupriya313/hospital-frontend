import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './patientdashboard.css'; // External CSS

function PatientDashboard() {
  const [showAppointmentOptions, setShowAppointmentOptions] = useState(false);
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    setShowAppointmentOptions(true);
  };

  const handleNewPatient = () => {
    navigate('/PatientAppointmentForm');
  };

  const handleExistingPatient = () => {
    navigate('/ExistingPatientAppointment');
  };

  const handleLogout = () => {
    navigate('/patientlogin');
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-heading">Welcome to Patient Dashboard</h1>
      <div className="homepage-button-container">
        <button className="homepage-button" onClick={handleBookAppointment}>
          Book Appointment
        </button>
        <button className="homepage-button logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {showAppointmentOptions && (
        <div className="appointment-options">
          <h2>Choose Patient Type</h2>
          <button className="homepage-button" onClick={handleNewPatient}>
            New Patient
          </button>
          <button className="homepage-button" onClick={handleExistingPatient}>
            Existing Patient
          </button>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
