import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a random 6-digit contact code
    const contactCode = Math.floor(100000 + Math.random() * 900000);

    // Include the contact code in the form data
    const dataToSubmit = { ...formData, contactCode };

    try {
        // Send data to your server using fetch
        const response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSubmit),
        });

        const data = await response.json();

        if (response.ok) {
            // Navigate to Thank You page
            navigate("/thank-you");
        } else {
            alert(data.error || "Failed to complete contact. Please try again.");
        }
    } catch (error) {
        console.error("There was an error submitting the form!", error);
        alert("There was an error submitting the form. Please try again.");
    }
    // Send form data to Web3Forms        collect from api
    setResult('Sending....');
    const web3FormData = new FormData();
    // web3FormData.append('access_key', '0744d425-7c7e-481e-a367-4f80e9212745');
    // web3FormData.append('access_key', '249ace1f-a3b6-4638-8600-ec46537c570f');
    web3FormData.append('name', formData.name);
    web3FormData.append('email', formData.email);
    web3FormData.append('subject', formData.subject);
    web3FormData.append('message', formData.message);

    try {
      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData,
      });

      const web3Data = await web3Response.json();

      if (web3Data.success) {
        setResult('Form Submitted Successfully');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.log('Error', web3Data);
        setResult(web3Data.message);
      }
    } catch (error) {
      console.error('Error submitting to Web3Forms', error);
      setResult('Error submitting form. Please try again.');
    }
  };

  return (
    <>
      {/* Contact Start */}
      <div className="contact">
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                Contact For Any Query
              </h5>
              <br />
              <br />
              <br />
            </div>
            <div className="row g-4">
              <div className="col-12">
                <div className="row gy-4">
                  <div className="col-md-4">
                    <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                      Booking
                    </h5>
                    <p>
                      <i className="fa fa-envelope-open text-primary me-2"></i>
                      book@example.com
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                      General
                    </h5>
                    <p>
                      <i className="fa fa-envelope-open text-primary me-2"></i>
                      info@example.com
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                      Technical
                    </h5>
                    <p>
                      <i className="fa fa-envelope-open text-primary me-2"></i>
                      tech@example.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
                <iframe
                  className="position-relative rounded w-100 h-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                  frameBorder="0"
                  style={{ minHeight: '350px', border: '0' }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
              <div className="col-md-6">
                <div className="wow fadeInUp" data-wow-delay="0.2s">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="subject">Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a message here"
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            style={{ height: '150px' }}
                          ></textarea>
                          <label htmlFor="message">Message</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                  <span>{result}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </>
  );
}