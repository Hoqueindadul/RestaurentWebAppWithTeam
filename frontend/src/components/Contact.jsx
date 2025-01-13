import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { DEPLOYMENT_BACKEND_URL } from "../deployment_backend_url";
import { LOCAL_BACKEND_URL } from "../local_backend_url";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    // Validation for empty fields
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      // Determine backend URL based on environment
      const BACKEND_URL =
        process.env.NODE_ENV === "production"
          ? DEPLOYMENT_BACKEND_URL
          : LOCAL_BACKEND_URL;

      // Send data to the backend for saving in the database
      await axios.post(
        `${BACKEND_URL}/api/users/contact`,
        { name, email, subject, message },
        { headers: { "Content-Type": "application/json" } }
      );

      // Prepare data for Web3Forms
      const web3FormData = new FormData();
      web3FormData.append("access_key", "c27f556b-c59f-4c19-8095-f92e9259a7a7");
      web3FormData.append("name", name);
      web3FormData.append("email", email);
      web3FormData.append("subject", subject);
      web3FormData.append("message", message);

      // Send data to Web3Forms
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData,
      });

      const web3Data = await web3Response.json();

      if (web3Response.ok && web3Data.success) {
        toast.success("Message sent successfully.");
      } else {
        toast.error(
          web3Data.message || "Failed to send message via Web3Forms."
        );
      }

      // Clear form fields
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Redirect after success
      setTimeout(() => {
        navigate("/thank-you");
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to send message. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="contact">
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center">

              <h2 className="card-title text-center text-primary mb-5">
                <b>Contact Us</b>
              </h2>

            </div>
            <div className="row g-4">
              <div className="col-md-6" >
                <form onSubmit={handleSubmit} style={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#ffe6e9",
                  padding: "10px", // Optional for spacing
                  borderRadius: "8px", // Optional for rounded corners

                }}>
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
                          style={{ height: "150px" }}
                        ></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-6" style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffe6e9",
                padding: "10px", // Optional for spacing
                borderRadius: "8px", // Optional for rounded corners

              }}>
                <iframe
                  className="position-relative rounded w-100 h-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345092564!2d144.9559233153163!3d-37.81720997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sVictoria%2C%20Australia!5e0!3m2!1sen!2sbd!4v1619670512085!5m2!1sen!2sbd"
                  frameBorder="0"
                  style={{ minHeight: "350px", border: "0" }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
