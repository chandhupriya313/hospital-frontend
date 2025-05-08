import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import './DoctorDashboard.css';

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;
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
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleBack = () => {
    navigate('/AdminHome');
  };

  //  pagination 
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="doctor-list-page">
      <button className="back-button" onClick={handleBack}><IoMdArrowRoundBack /></button>
      <h2>Available Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors available.</p>
      ) : (
        <>
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
              {currentDoctors.map((doc) => (
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

          <div className="pagination-buttons">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorListPage;
