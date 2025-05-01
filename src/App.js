import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './component/login/AdminLogin';

import PatientLogin from './component/login/PatientLogin';

import MainPage from './component/home/MainPage';
import PatientRegistration from './component/regestration/PatientRegistration';
import AdminHome from './component/home/AdminHome';
import AppointmentManagement from './component/Appointments/AppointmentManagement';
import DoctorDashboard from './component/home/DoctorDashboard';
import PatientDashboard from './component/home/patientdashboard';
import NewPatientAppointment from './component/home/NewPatient';
import ExistingPatientAppointment from './component/Appointments/ExistingPatientAppointment';
import DoctorListPage from './component/home/DoctorListPage';
import AppointmentListPage from './component/Appointments/AppointmentListPage';
import PatientAppointmentForm from './component/Appointments/PatientAppointmentForm';
import AdminForgotPassword from './component/login/AdminForgotPassword';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
       
        <Route path="/patientlogin" element={<PatientLogin/>} />
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/mainpage" element={<MainPage/>} />
        <Route path="/mainpage" element={<MainPage/>} />
        <Route path="/patientRegestration" element={<PatientRegistration />} />
        <Route path="/AdminHome" element={<AdminHome/>} />
        <Route path="/AppointmentManagement" element={<AppointmentManagement/>} />
        <Route path='/doctordashboard' element={<DoctorDashboard />} />
        <Route path='/NewPatientAppointment' element={<NewPatientAppointment/>} />
        <Route path='/ExistingPatientAppointment' element={<ExistingPatientAppointment/>} />
        <Route path='/DoctorListPage' element={<DoctorListPage />} />
        <Route path='/AppointmentListPage' element={<AppointmentListPage />} />
        <Route path='/PatientAppointmentForm' element={<PatientAppointmentForm />} />
        <Route path='/AdminForgotpassword' element={<AdminForgotPassword />} />
        
      </Routes>
    </Router>
  );
}

export default App;
