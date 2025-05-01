import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // For params and navigation
import './UpdateAppointmentPage.css';

const UpdateAppointmentPage = () => {
  const { id } = useParams(); // Get the appointment ID from the URL
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchAppointmentDetails();
  }, [id]);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/appointments/${id}`);
      setAppointment(response.data);
      setNewDate(response.data.appointmentDate);
      setNewTime(response.data.appointmentTime);
      setStatus(response.data.status);
    } catch (err) {
      console.error('Error fetching appointment details:', err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedAppointment = {
      ...appointment,
      appointmentDate: newDate,
      appointmentTime: newTime,
      status: status,
    };

    try {
      const response = await axios.put(`http://localhost:8080/appointments/${id}`, updatedAppointment);
      console.log('Appointment updated:', response.data);
      alert('Appointment updated successfully.');
      navigate('/appointments'); // Redirect to the appointments list page after update
    } catch (err) {
      console.error('Error updating appointment:', err);
      alert('Failed to update appointment.');
    }
  };

  return (
    <div className="update-appointment-container">
      <h2>Update Appointment</h2>

      {/* Display Appointment ID and Update Button */}
      <div className="appointment-id-section">
        <label><strong>Appointment ID: </strong>{id}</label> {/* Display ID */}
        <button className="update-btn" onClick={() => navigate('/appointments')}>
          Go Back to Appointment List
        </button>
      </div>

      {appointment ? (
        <form onSubmit={handleUpdate}>
          <table className="appointment-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>DOB</th>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{appointment.id}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.patientDob}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.doctorSpecialization}</td>
                <td>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    required
                  />
                </td>
                <td>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
                <td>{appointment.createdAt ? new Date(appointment.createdAt).toLocaleString() : 'N/A'}</td>
                <td>{appointment.updatedAt ? new Date(appointment.updatedAt).toLocaleString() : 'N/A'}</td>
              </tr>
            </tbody>
          </table>

          <button type="submit">Update Appointment</button>
        </form>
      ) : (
        <p>Loading appointment details...</p>
      )}
    </div>
  );
};

export default UpdateAppointmentPage;
