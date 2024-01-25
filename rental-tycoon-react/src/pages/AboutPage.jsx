import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <p>Welcome to our website! We are dedicated to providing you with the best services/products.</p>
        <p>
          At our rental company, we specialize in providing top-quality machinery for various industries.
          Whether you're in construction, agriculture, or manufacturing, we have the equipment you need to get the job done efficiently.
        </p>
        <p>
          Our extensive inventory includes excavators, bulldozers, tractors, and much more. We take pride in offering flexible rental options,
          competitive pricing, and exceptional customer service to ensure your satisfaction.
        </p>
        <p>Contact us today to learn more about how we can support your projects!</p>
      </div>
    </div>
  );
}

export default AboutPage;