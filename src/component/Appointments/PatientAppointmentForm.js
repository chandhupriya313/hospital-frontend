import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PatientAppointmentForm.css';

const PatientAppointmentForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientDob: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/doctor/all')
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        console.error('Error fetching doctors:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedDoctor = doctors.find(doc => doc.id.toString() === formData.doctorId);
      if (!selectedDoctor) {
        setMessage("Selected doctor not found.");
        return;
      }

      const appointmentData = {
        patientName: formData.patientName,
        patientDob: formData.patientDob,
        doctorName: selectedDoctor.name,
        doctorSpecialization: selectedDoctor.specialization,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        status: 'PENDING'
      };

      await axios.post('http://localhost:8080/appointments/create', appointmentData);


      setMessage('Appointment booked successfully!');
      setTimeout(() => {
        navigate('/PatientDashboard');
      }, 1000);

    } catch (err) {
      console.error('Error booking appointment:', err);
      setMessage('Failed to book appointment.');
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>Book an Appointment</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="appointment-form">
        {/* Form Fields */}
        <label htmlFor="text">
          Patient Name:
          <input
            id="text"
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="date" >
          Date of Birth:
          <input
            id="date"
            type="date"
            name="patientDob"
            value={formData.patientDob}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="doctorId">
          Select Doctor:
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                Dr. {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="date">
          Appointment Date:
          <input
            id="date"
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="time">
          Appointment Time:
          <input
            id="time"
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </label>
        <button onClick={() => navigate('/patientdashboard')}>Book appointment</button>

      </form>
    </div>
  );
};

export default PatientAppointmentForm;
