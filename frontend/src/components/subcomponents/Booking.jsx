import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { DEPLOYMENT_BACKEND_URL } from "../../deployment_backend_url"
import { LOCAL_BACKEND_URL } from "../../local_backend_url"
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
    const [loading, setLoading] = useState(false); // State to manage loading
    const [error, setError] = useState(""); // State to manage errors

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true
        setError(""); // Reset errors

        try {
            const response = await axios.post(`${BACKENDURL}/booking`, formData);

            if (response.status === 200) {
                const { bookingCode } = response.data; // Ensure the booking code comes from the backend
                alert(`Booking successfully completed! Your booking code is ${bookingCode}`);
                navigate("/"); // Navigate to the home page
            } else {
                setError(response.data.error || "Failed to complete booking. Please try again.");
            }
        } catch (err) {
            console.error("Error details:", err);
            setError("There was an error submitting the form. Please try again.");
        } finally {
            setLoading(false); // Set loading state back to false
        }
    };

    return (
        <div className="bookingpage">
            <div className="booking">
                <form id="booking-box" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h1 className="hq">*- Reserve Now -*</h1>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            aria-label="Name"
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
                            aria-label="Email"
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
                            pattern="[0-9]{10}" // Ensure a valid phone number
                            aria-label="Phone"
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
                            min={new Date().toISOString().split("T")[0]} // Restrict to future dates
                            aria-label="Date"
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
                            aria-label="Time"
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
                            max="20" // Limit number of guests
                            aria-label="Number of Guests"
                        />
                    </div>
                    <button type="submit" className="btn btn-primaryb" disabled={loading}>
                        {loading ? "Booking..." : "Book Now"}
                    </button>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Booking;

