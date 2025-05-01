import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'; // ✅ Import this
import './AppointmentListPage.css';

const AppointmentListPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const navigate = useNavigate(); // ✅ Initialize this

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:8080/appointments/all');
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/appointments/${appointmentId}/status?status=${status}`
      );
      console.log('Status updated successfully:', response.data);
      fetchAppointments();
    } catch (error) {
      console.error('Failed to update status:', error.response?.data || error.message);
      alert('Status update failed');
    }
  };

  const deleteAppointment = async () => {
    if (!deleteId) {
      alert('Please enter an appointment ID.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/appointments/${deleteId}`);
      alert(`Appointment ID ${deleteId} deleted.`);
      setDeleteId('');
      fetchAppointments();
    } catch (err) {
      console.error('Error deleting appointment:', err);
      alert('Failed to delete appointment. Please check the ID.');
    }
  };

  const updateAppointment = async () => {
    if (!updateId || !newDate || !newTime) {
      alert('Please enter ID, new date, and new time.');
      return;
    }

    try {
      const appointmentToUpdate = appointments.find((a) => a.id === parseInt(updateId));
      if (!appointmentToUpdate) {
        alert('Appointment not found.');
        return;
      }

      const updatedData = {
        ...appointmentToUpdate,
        appointmentDate: newDate,
        appointmentTime: newTime,
      };

      await axios.put(`http://localhost:8080/appointments/${updateId}`, updatedData);
      alert(`Appointment ID ${updateId} updated.`);
      setUpdateId('');
      setNewDate('');
      setNewTime('');
      fetchAppointments();
    } catch (err) {
      console.error('Error updating appointment:', err);
      alert('Failed to update appointment.');
    }
  };

  const handleBack = () => {
    navigate('/AdminHome'); // ✅ Ensure this route is correct
  };

  return (
    <div className="appointment-list">
      <button className="back-button" onClick={handleBack}>
      <IoMdArrowRoundBack /> Back
      </button>
      <h2>Appointments</h2>

      {/* Delete Section */}
      <div className="delete-section">
        <input
          type="number"
          placeholder="Enter Appointment ID to delete"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button className="delete-btn" onClick={deleteAppointment}>
          Delete Appointment
        </button>
      </div>

      {/* Update Section */}
      <div className="update-section">
        <input
          type="number"
          placeholder="Enter Appointment ID to update"
          value={updateId}
          onChange={(e) => setUpdateId(e.target.value)}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button className="update-btn" onClick={updateAppointment}>
          Update Appointment
        </button>
      </div>

      {/* Appointment Table */}
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>DOB</th>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.patientName}</td>
                <td>{appt.patientDob}</td>
                <td>{appt.doctorName}</td>
                <td>{appt.doctorSpecialization}</td>
                <td>{appt.appointmentDate}</td>
                <td>{appt.appointmentTime}</td>
                <td>{appt.status}</td>
                <td>{appt.createdAt ? new Date(appt.createdAt).toLocaleString() : 'N/A'}</td>
                <td>{appt.updatedAt ? new Date(appt.updatedAt).toLocaleString() : 'N/A'}</td>
                <td>
                  <button onClick={() => handleStatusUpdate(appt.id, 'APPROVED')}>Accept</button>
                  <button onClick={() => handleStatusUpdate(appt.id, 'REJECTED')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentListPage;
