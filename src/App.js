import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AdminLogin from './component/login/AdminLogin';
import PatientLogin from './component/login/PatientLogin';
import MainPage from './component/home/MainPage';
import PatientRegistration from './component/regestration/PatientRegistration';
import AdminHome from './component/home/AdminHome';

import DoctorDashboard from './component/home/DoctorDashboard';
import PatientDashboard from './component/home/patientdashboard';
import NewPatientAppointment from './component/home/NewPatient';
import ExistingPatientAppointment from './component/Appointments/ExistingPatientAppointment';
import DoctorListPage from './component/home/DoctorListPage';
import AppointmentListPage from './component/Appointments/AppointmentListPage';
import PatientAppointmentForm from './component/Appointments/PatientAppointmentForm';
import AdminForgotPassword from './component/login/AdminForgotPassword';
import PatientReviewPage from './component/Appointments/PatientReviewPage';




const BackgroundController = () => {
  const location = useLocation();

  useEffect(() => {
    const imageRoutes = [
      '/login',
      '/patientregistration',
      '/patientlogin',
      '/adminforgotpassword',
    ];

    if (imageRoutes.includes(location.pathname.toLowerCase())) {
      document.body.style.backgroundImage = "url('/images/adminlogin.jpg')";
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundAttachment = 'fixed';
    } else {
      document.body.style.backgroundImage = 'none';
    }

    return () => {
      document.body.style.backgroundImage = 'none';
    };
  }, [location]);

  return null; // this component just runs the background logic
};

const App = () => {
  return (
    <Router>
      <BackgroundController />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/PatientLogin" element={<PatientLogin />} />
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/PatientRegistration" element={<PatientRegistration />} />
        <Route path="/adminhome" element={<AdminHome />} />

        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        <Route path="/newpatientappointment" element={<NewPatientAppointment />} />
        <Route path="/existingpatientappointment" element={<ExistingPatientAppointment />} />
        <Route path="/doctorlistpage" element={<DoctorListPage />} />
        <Route path="/appointmentlistpage" element={<AppointmentListPage />} />
        <Route path="/patientappointmentform" element={<PatientAppointmentForm />} />
        <Route path="/adminforgotpassword" element={<AdminForgotPassword />} />
        <Route path="/PatientReviewPage" element={<PatientReviewPage />} />

      </Routes>
    </Router>
  );
};

export default App;
