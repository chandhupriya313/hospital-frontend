import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AppointmentListPage.css';

const appointmentsPerPage = 6;

const AppointmentListPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectionInputs, setRejectionInputs] = useState({});
  const [deleteId, setDeleteId] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/appointments/all');
      setAppointments(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`http://localhost:8080/appointments/${id}/status?status=${status}`);
      fetchAppointments();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status.');
    }
  };

  const toggleRejectionInput = (id) => {
    setRejectionInputs((prev) => ({
      ...prev,
      [id]: prev[id] ? null : '',
    }));
  };

  const submitRejection = async (id) => {
    const reason = rejectionInputs[id];
    if (!reason) {
      alert('Please enter a reason.');
      return;
    }
    try {
      await axios.patch(`http://localhost:8080/appointments/${id}/status?status=REJECTED&reason=${reason}`);
      setRejectionInputs((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
      fetchAppointments();
    } catch (err) {
      console.error('Rejection failed:', err);
      alert('Failed to reject appointment.');
    }
  };

  const deleteAppointment = async () => {
    if (!deleteId) return alert('Enter ID.');
    try {
      await axios.delete(`http://localhost:8080/appointments/${deleteId}`);
      alert(`Appointment ${deleteId} deleted.`);
      setDeleteId('');
      fetchAppointments();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete appointment.');
    }
  };

  const updateAppointment = async () => {
    if (!updateId || !newDate || !newTime) {
      return alert('Please enter all fields.');
    }

    const appt = appointments.find((a) => a.id === parseInt(updateId));
    if (!appt) return alert('Appointment not found.');

    const updatedData = {
      ...appt,
      appointmentDate: newDate,
      appointmentTime: newTime,
    };

    try {
      await axios.put(`http://localhost:8080/appointments/${updateId}`, updatedData);
      alert(`Appointment ${updateId} updated.`);
      setUpdateId('');
      setNewDate('');
      setNewTime('');
      fetchAppointments();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update appointment.');
    }
  };

  const handleBack = () => {
    navigate('/adminhome');
  };

  const filteredAppointments = appointments.filter((a) =>
    a.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);
  const currentAppointments = filteredAppointments.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage
  );

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="appointment-list">
      <button className="back-button" onClick={handleBack}><IoPlaySkipBack /></button>
      <h2>Appointments</h2>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by Patient Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="delete-section">
        <label><strong>Delete by ID</strong></label>
        <input
          type="number"
          placeholder="Appointment ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button className="delete-btn" onClick={deleteAppointment}>Delete</button>
      </div>

      <div className="update-section">
        <label><strong>Update by ID</strong></label>
        <input
          type="number"
          placeholder="Appointment ID"
          value={updateId}
          onChange={(e) => setUpdateId(e.target.value)}
        />
        <label><strong>Date</strong></label>
        <input
          type="date"
          min={today}
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <label><strong>Time</strong></label>
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button className="update-btn" onClick={updateAppointment}>Update</button>
      </div>

      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <>
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
                <th>Review</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.id}</td>
                  <td>{appt.patientName}</td>
                  <td>{appt.patientDob}</td>
                  <td>{appt.doctorName}</td>
                  <td>{appt.doctorSpecialization}</td>
                  <td>{appt.appointmentDate}</td>
                  <td>{appt.appointmentTime}</td>
                  <td>{appt.status}</td>
                  <td>{appt.review || 'No review'}</td>
                  <td>{appt.createdAt ? new Date(appt.createdAt).toLocaleString() : 'N/A'}</td>
                  <td>{appt.updatedAt ? new Date(appt.updatedAt).toLocaleString() : 'N/A'}</td>
                  <td>
                    <button
                      disabled={appt.status === 'APPROVED'}
                      onClick={() => handleStatusUpdate(appt.id, 'APPROVED')}
                    >
                      Accept
                    </button>
                    <button
                      disabled={appt.status === 'REJECTED'}
                      onClick={() => toggleRejectionInput(appt.id)}
                    >
                      Reject
                    </button>

                    {rejectionInputs[appt.id] !== undefined && (
                      <div className="rejection-box">
                        <input
                          type="text"
                          placeholder="Rejection reason"
                          value={rejectionInputs[appt.id]}
                          onChange={(e) =>
                            setRejectionInputs((prev) => ({
                              ...prev,
                              [appt.id]: e.target.value
                            }))
                          }
                        />
                        <button onClick={() => submitRejection(appt.id)}>Submit</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <IoPlaySkipBack />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <IoPlaySkipForward />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentListPage;
