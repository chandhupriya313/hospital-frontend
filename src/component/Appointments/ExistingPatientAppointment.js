import React, { useState } from 'react';
import axios from 'axios';

const PatientRecordByName = () => {
  const [patientName, setPatientName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const response = await axios.get(`http://localhost:8080/appointments/by-patient`, {
        params: { patientName },
      });
      if (response.data.length > 0) {
        setAppointments(response.data);
      } else {
        setNotFound(true);
        setAppointments([]);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setNotFound(true);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>Search Patient Appointments</h2>
      <input
        type="text"
        placeholder="Enter patient name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        style={styles.input}
      />
      <button onClick={fetchAppointments} style={styles.button}>Search</button>

      {loading && <p>Loading...</p>}

      {notFound && <p>No records found for "{patientName}"</p>}

      {appointments.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>DOB</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.patientName}</td>
                <td>{appt.patientDob}</td>
                <td>{appt.doctorName}</td>
                <td>{appt.appointmentDate}</td>
                <td>{appt.status}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    padding: '8px',
    marginRight: '10px',
    width: '250px',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  table: {
    marginTop: '20px',
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f2f2f2',
  },
};

export default PatientRecordByName;
