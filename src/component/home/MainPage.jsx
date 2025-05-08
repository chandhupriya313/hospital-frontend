import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();
  const [showServices, setShowServices] = useState(true);

  const toggleServices = () => {
    setShowServices(!showServices);
  };

  return (
    <div>

      <header className="navbar-nav">
        <div className="navbar-title"><h1>Hospital Management</h1></div>
        <nav className="navbar-links">
          <button onClick={() => navigate('/login')}>Admin Login</button>
          <button onClick={() => navigate('/patientlogin')}>Patient Login</button>
        </nav>
      </header>


      <div className="main-content">
        <div className="welcome-message">
          <h2>Welcome to Hospital Management</h2>
          <p>Your health and well-being are our priority.</p>
          <button className='mainPageButton' onClick={toggleServices}>

            {showServices ? "Hide Services" : "Show Services"}

          </button>
        </div>
        <br />  <br />  <br />

        {showServices && (
          <div className="services">
            <div className="service-box">
              <h3>Emergency Services</h3>
              <p>24/7 emergency services with immediate medical attention available.</p>
            </div>
            <div className="service-box">
              <h3>Outpatient Care</h3>
              <p>Consult experienced doctors in various specialties and get the treatment you need.</p>
            </div>
            <div className="service-box">
              <h3>Inpatient Care</h3>
              <p>Comfortable and compassionate care for patients requiring overnight hospitalization.</p>
            </div>
          </div>
        )}
      </div>


      <footer>
        <p>© 2025 XYZ Hospital. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
