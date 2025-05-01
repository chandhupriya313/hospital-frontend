// src/components/AdminHome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // If using JWT token
    navigate('/login');
  };

  return (
    <div className="admin-home">
      {/* Header / Navbar */}
      <header className="admin-header">
        <h1>Admin Dashboard - Hospital Management</h1>
        <nav className="admin-nav">
         
          
          <button onClick={() => navigate('/doctordashboard')}>Add Doctors</button>
          <button onClick={() => navigate('/DoctorListPage')}>Doctor List</button>
          <button onClick={() => navigate('/AppointmentListPage')}>Appointments</button>
          <button onClick={() => navigate('/patientdashboard')}>Patient Portal</button>
          <button onClick={() => navigate('/login')}>Logout</button>
        </nav>
      </header>

      {/* Body Section */}
      <main className="admin-main">
        <h2>Welcome, Admin!</h2>
        <p>Use the navigation above to manage hospital operations.</p>
      </main>

      {/* Footer */}
      <footer className="admin-footer">
        <p>© 2025 XYZ Hospital Management System</p>
      </footer>
    </div>
  );
};

export default AdminHome;
