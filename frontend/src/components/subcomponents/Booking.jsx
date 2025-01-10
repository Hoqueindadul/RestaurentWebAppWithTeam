import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Booking() {
    const navigate = useNavigate();                         // Hook for programmatic navigation to different routes
    const [formData, setFormData] = useState({              // State to store form data
        name: '',   
        email: '',  
        phone: '',
        date: '', 
        time: '',   
        guests: ''  
    });

    // Function to handle changes in form fields
    const handleChange = (e) => {
        const { id, value } = e.target;         // Destructure the id and value from the event target
        setFormData(prevState => ({             // Update the formData state
            ...prevState,                       // Spread in the previous state
            [id]: value                         // Update the changed field
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        // Generate a random 6-digit booking code (optional)
        const bookingCode = Math.floor(100000 + Math.random() * 900000);
    
        // Include the booking code in the data to be submitted
        const dataToSubmit = { ...formData, bookingCode };
    
        try {
            const response = await fetch("http://localhost:5000/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSubmit),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Alert the user of successful booking and show the booking code
                alert(`Booking complete successfully! Your booking code is ${bookingCode}`);
                navigate("/"); // Navigate to the home page
            } else {
                alert(data.error || "Failed to complete booking. Please try again."); // Alert the user of a failure in booking
            }
        } catch (error) {
            console.error("Error details:", error);
            alert("There was an error submitting the form. Please try again."); // Alert the user if there's an issue with submission
        }
    };
    
    return (
        <div className='bookingpage'>
    <div className="booking">
        <form id="booking-box" onSubmit={handleSubmit}>
            <div className="form-group">
                <h1 className='hq'> *-Reserve Now-*</h1>
                <label htmlFor="name">Name :</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email :</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone :</label>
                <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date :</label>
                <input type="date" className="form-control" id="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="time">Time :</label>
                <input type="time" className="form-control" id="time" value={formData.time} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="guests">Number of Guests :</label>
                <input type="number" className="form-control" id="guests" placeholder="Enter number of guests" value={formData.guests} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primaryb">BOOK</button>
        </form>
    </div>
</div>

    );
}

export default Booking;
