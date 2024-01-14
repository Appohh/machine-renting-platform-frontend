import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./ConfirmPage.css";
import thumb from "../assets/images/parts/green-thumb.png";

function ConfirmPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      window.location.href = '/';
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className='confirmPage-content'>
      <h1 className='confirmPage-ThankYou-message'>Thank you!</h1>
      <img className='confirmPage-Image' src={thumb} alt='Duimpie'></img>
      <p className='confirmPage-Text'>Your rental is successfully completed</p>
      <p className='confirmPage-Countdown'>Redirecting in {countdown} seconds...</p>
    </div>
  );
}

export default ConfirmPage;