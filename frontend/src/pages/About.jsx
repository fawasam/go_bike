// AboutPage.js

import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="bike-animation-container">
        <div className="background-image"></div>
        <div className="content">
        <div
        className="wrapper flex flex-col lg:flex-row justify-start lg:justify-between
    gap-12 lg:gap-6 text-center"
      >
        <h2 className="head_text flex-1 text-center text-center lg:text-start">

          <center>About our</center>
          <center><span className="green_text">Go-bike rental</span></center>
        </h2>
        </div>
          <p>
            Welcome to our university's bike rental system! We provide an
            efficient and sustainable way for students and staff to explore the
            campus.
          </p>
          <p>
            Our bike rental system aims to promote eco-friendly transportation
            and make it easy for everyone to commute within the university
            premises.
          </p>
          <p>
            Feel free to contact us for more information or to get started with
            renting a bike. Happy riding!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
