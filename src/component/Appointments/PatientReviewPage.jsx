import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PatientReviewPage() {
    const [appointments, setAppointments] = useState([]);
    const [reviews, setReviews] = useState({});
    const [visitedStatus, setVisitedStatus] = useState({});
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const isDoctor = role === 'DOCTOR';

    useEffect(() => {
        fetchAppointments();
    }, [username]);

    const fetchAppointments = () => {
        if (!username) return;
        axios
            .get(`http://localhost:8080/appointments/by-patient?patientName=${username}`)
            .then(res => setAppointments(res.data))
            .catch(err => {
                console.error("Error fetching appointments", err);
                setAppointments([]);
            });
    };

    const handleReviewChange = (id, text) => {
        setReviews(prev => ({ ...prev, [id]: text }));
    };

    const handleVisitedChange = (id, value) => {
        setVisitedStatus(prev => ({ ...prev, [id]: value }));
    };

    const isReviewAllowed = (appointment) => {
        const today = new Date();
        const appointmentDate = new Date(appointment.appointmentDate);
        const diffDays = Math.floor((today - appointmentDate) / (1000 * 60 * 60 * 24));
        return appointment.visited === 'YES' && diffDays >= 7;
    };

    const submitReview = (appointmentId) => {
        const reviewText = reviews[appointmentId];
        if (!reviewText) return;

        axios.put(`http://localhost:8080/appointments/${appointmentId}/review`, { review: reviewText })
            .then(() => {
                alert("Review submitted successfully.");
                fetchAppointments();
            })
            .catch(err => {
                console.error("Error submitting review", err);
                alert("Failed to submit review.");
            });
    };

    const updateVisitedStatus = (appointmentId) => {
        const visited = visitedStatus[appointmentId];
        if (!visited) return;

        axios.put(`http://localhost:8080/appointments/${appointmentId}/visited?visited=${visited}`)
            .then(() => {
                alert("Visited status updated.");
                fetchAppointments();
            })
            .catch(err => {
                console.error("Error updating visited status", err);
                alert("Failed to update visited status.");
            });
    };

    return (
        <div className="review-page">
            <h2>Patient Appointment Reviews</h2>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Doctor</th>
                            <th>Status</th>
                            <th>Visited</th>
                            <th>Rejection Reason</th>
                            <th>Review</th>
                            <th>New Review</th>
                            {isDoctor && <th>Mark Visited</th>}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(app => (
                            <tr key={app.id}>
                                <td> {app.patientName}</td>
                                <td>{app.appointmentDate}</td>
                                <td>{app.appointmentTime}</td>
                                <td>{app.doctorName}</td>
                                <td>{app.status}</td>
                                <td>{app.visited || 'N/A'}</td>
                                <td>{app.rejectionReason || 'N/A'}</td>
                                <td>{app.review || 'N/A'}</td>
                                <td>
                                    <textarea
                                        disabled={!isReviewAllowed(app)}
                                        value={reviews[app.id] || ''}
                                        onChange={(e) => handleReviewChange(app.id, e.target.value)}
                                        placeholder={isReviewAllowed(app) ? "Write your review" : "Review disabled"}
                                        rows={2}
                                        cols={30}
                                    />
                                </td>
                                {isDoctor && app.status === 'APPROVED' && (
                                    <td>
                                        <select
                                            value={visitedStatus[app.id] || ''}
                                            onChange={(e) => handleVisitedChange(app.id, e.target.value)}
                                        >
                                            <option value="">--Select--</option>
                                            <option value="YES">Yes</option>
                                            <option value="NO">No</option>
                                        </select>
                                    </td>
                                )}
                                <td>
                                    <button
                                        onClick={() => submitReview(app.id)}
                                        disabled={!isReviewAllowed(app)}
                                    >
                                        Submit Review
                                    </button>
                                    {isDoctor && app.status === 'APPROVED' && (
                                        <button onClick={() => updateVisitedStatus(app.id)}>
                                            Update Visited
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PatientReviewPage;
