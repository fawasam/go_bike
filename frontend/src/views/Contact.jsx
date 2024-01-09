import React from 'react';
import contactPattern from "../assets/contact-pattern.svg";
import { PrimaryButton } from "../components";

const Contact = () => {
  const divStyle = {
    backgroundImage: `url(${contactPattern})`,
    backgroundSize: 'cover', // You can customize this property based on your needs
    backgroundPosition: 'center', // You can customize this property based on your needs
    // Add any other background-related styles here
    // For example, backgroundRepeat, backgroundColor, etc.
  };

  return (
    <div className="mt-36 py-28 bg-lightest-gray relative" style={divStyle}>
      <div
        className="wrapper flex flex-col lg:flex-row justify-start lg:justify-between
    gap-6 lg:gap-12"
      >
        <h1 className="head_text flex-1 text-center lg:text-start">
          Let's begin with <br />
          <span className="green_text">Go-bike rental</span>
        </h1>

        <div className="flex flex-col gap-[26px] flex-1">
          <p className="text-light-gray text-center lg:text-start">
            we try our best to help you
          </p>

          <PrimaryButton className="mx-auto lg:mx-0 w-full sm:w-fit">
            Contact us
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Contact;
