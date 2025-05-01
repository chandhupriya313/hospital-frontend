import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  useEffect(() => {
    // Fetch doctor list
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
      const appointmentData = {
        ...formData,
        doctorName: selectedDoctor?.name,
        doctorSpecialization: selectedDoctor?.specialization,
        status: 'PENDING'
      };

      const res = await axios.post('http://localhost:8080/appointments/create', appointmentData);
      setMessage('Appointment booked successfully!');
      setFormData({
        patientName: '',
        patientDob: '',
        doctorId: '',
        appointmentDate: '',
        appointmentTime: ''
      });
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
        <label>
          Patient Name:
          <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required />
        </label>

        <label>
          Date of Birth:
          <input type="date" name="patientDob" value={formData.patientDob} onChange={handleChange} required />
        </label>

        <label>
          Select Doctor:
          <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
            <option value="">-- Choose Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                Dr. {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>
        </label>

        <label>
          Appointment Date:
          <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
        </label>

        <label>
          Appointment Time:
          <input type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required />
        </label>

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default PatientAppointmentForm;
