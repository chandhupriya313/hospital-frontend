import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import './DoctorDashboard.css';

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/doctor/all');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctor list:', error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/doctor/delete/${id}`);
      fetchDoctors(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleBack = () => {
    navigate('/AdminHome'); // Adjust this path if your admin home route is different
  };

  return (
    <div className="doctor-list-page">
      <button className="back-button" onClick={handleBack}><IoMdArrowRoundBack /></button>
      <h2>Available Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors available.</p>
      ) : (
        <table className="doctor-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Profession</th>
              <th>Specialization</th>
              <th>Working Days</th>
              <th>Working Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.name}</td>
                <td>{doc.profession}</td>
                <td>{doc.specialization}</td>
                <td>{doc.workingDays}</td>
                <td>{doc.workingHours}</td>
                <td>
                  <button onClick={() => handleDeleteDoctor(doc.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorListPage;
