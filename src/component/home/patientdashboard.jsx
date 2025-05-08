import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import './patientdashboard.css';

function PatientDashboard() {
  const [profileData, setProfileData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showAppointmentOptions, setShowAppointmentOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6;

  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  // Fetch profile data
  const fetchProfile = () => {
    axios
      .get(`http://localhost:8080/hosp/profile?username=${username}`)
      .then((res) => setProfileData(res.data))
      .catch(console.error);
  };

  // Fetch appointment data
  const fetchAppointments = () => {
    axios
      .get(`http://localhost:8080/appointments/by-patient?patientName=${username}`)
      .then((res) => setAppointments(res.data))
      .catch((error) => {
        console.error('Error fetching appointments:', error);
        setAppointments([]);
      });
  };

  useEffect(() => {
    if (!username) {
      navigate('/patientlogin');
      return;
    }

    fetchProfile();
    fetchAppointments();
  }, [username, navigate]);

  const handleBookAppointment = () => setShowAppointmentOptions(true);
  const handleNewPatient = () => navigate('/PatientAppointmentForm');
  const handleExistingPatient = () => navigate('/PatientReviewPage');
  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/mainpage');
  };

  const openProfileModal = () => {
    fetchAppointments(); // Optional: Refresh appointments each time modal opens
    setIsModalOpen(true);
  };

  const closeProfileModal = () => setIsModalOpen(false);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  return (
    <div className="homepage-container">
      <div className="navbar">
        <button className="navbar-button" onClick={handleBookAppointment}>
          Book Appointment
        </button>
        <button className="navbar-button" onClick={openProfileModal}>
          <CgProfile /> {profileData ? profileData.username : username}
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1 className="homepage-heading">Welcome, {profileData ? profileData.username : username}!</h1>

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

      {isModalOpen && profileData && (
        <div className="modal-overlay" onClick={closeProfileModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeProfileModal}>×</button>
            <div className="profile-content">
              <h2>Patient Profile</h2>
              <p><strong>Name:</strong> {profileData.username}</p>

              <h3>Appointments</h3>
              {appointments.length ? (
                <>
                  <ul className="appointment-list">
                    {currentAppointments.map((app) => (
                      <li key={app.id}>
                        <p><strong>Patient :</strong> {app.patientName}</p>
                        <p><strong>Appointment Date:</strong> {app.appointmentDate}</p>
                        <p><strong>Appointment Time:</strong> {app.appointmentTime}</p>
                        <p><strong>Doctor:</strong> {app.doctorName}</p>
                        <p><strong>Status:</strong> {app.status}</p>
                        <hr />
                      </li>
                    ))}
                  </ul>

                  <div className="pagination-controls">
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                      Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <p>No appointments found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
