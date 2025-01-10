import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thanks">
      <img className="img-fluid" src="thanks.png" alt="bgc" />
      <h1>Thanks for contacting !</h1>
    </div>
  );
};

export default ThankYou;
