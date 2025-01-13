import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { DEPLOYMENT_BACKEND_URL } from "../../deployment_backend_url";
import { LOCAL_BACKEND_URL } from "../../local_backend_url";
import axios from 'axios';

function Booking() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [bookingCode, setBookingCode] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: id === "guests" ? parseInt(value, 10) || "" : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.guests) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        try {
            const formattedData = {
                ...formData,
                date: new Date(formData.date).toISOString().split("T")[0],
                bookingCode: Date.now().toString() // Generate a unique bookingCode
            };

            const BACKEND_URL =
                process.env.NODE_ENV === "production"
                    ? DEPLOYMENT_BACKEND_URL
                    : LOCAL_BACKEND_URL;

            const response = await axios.post(`${BACKEND_URL}/api/users/book-a-table`, formattedData);

            if (response.status === 201) {
                setBookingCode(response.data.booking.bookingCode); // Save booking code
                setShowSuccessModal(true); // Show success modal
            } else {
                setError(response.data.error || "Failed to complete booking. Please try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "There was an error submitting the form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setShowSuccessModal(false);
        navigate("/");
    };

    return (
        <div className="container-fluid background-container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <div className="card p-4 shadow-lg">
                        <div className="card-body">

                            <h2 className="card-title text-center text-primary mb-4">
                                <b>Reserve Now</b>
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone:</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{10}"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        min={new Date().toISOString().split("T")[0]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="time">Time:</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="guests">Number of Guests:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="guests"
                                        placeholder="Enter number of guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        max="20"
                                    />
                                </div>
                                <button type="submit" className="btn p-2 btn-primary w-50 d-flex mx-auto justify-content-center mb-3 btn-block" disabled={loading}>
                                    {loading ? "Booking..." : "Book Now"}
                                </button>
                                {error && <p className="text-danger mt-2">{error}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Booking Successful</h5>
                            </div>
                            <div className="modal-body">
                                <p>Your booking was successful!</p>
                                <p>Your booking code is: <strong>{bookingCode}</strong></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Booking;
