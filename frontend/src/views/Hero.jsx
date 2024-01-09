import React, { useState, useRef } from "react";
import RentingProcess from "./RentingProcess";
import { LabelInput, PrimaryButton } from "../components";
import busIcon from "../assets/bus-icon.svg";
import locationIcon from "../assets/location-icon.svg";
import calendarIcon from "../assets/calendar-icon.svg";
import pondi from "../assets/uni-fws.jpg";

const Hero = () => {
  const targetRef = useRef(null);

  const handleBookNowClick = () => {
    window.scrollTo({
      top: window.pageYOffset + 500,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white">
      <div
        className="relative top-0 -z-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.813)" }}
      >
        <img
          src={pondi}
          alt="image1"
          className="cover w-full h-full opacity-40"
        />
      </div>
      <div className="absolute top-60 left-0 right-0 z-10">
        <div className="wrapper min-h-[444px] ">
          <h1 className="text-white pt-28 text-center text-6xl font-extrabold">
            Find your <span className="green_text">rental bike</span>
          </h1>
          <h4 className="text-white text-center font-raleway text-xl pb-4">
            You choose. We deliver.
          </h4>
          <PrimaryButton
            className="w-1/5 lg:w-40 flex item-center mx-auto"
            small={false}
            onClick={handleBookNowClick}
          >
            Book Now
          </PrimaryButton>
        </div>
      </div>

      <div className="wrapper" ref={targetRef}>
        <div className="relative bg-white px-10 sm:px-[76px] py-9 sm:py-[70px] mt-5 sm:-mt-[166px] min-h-[330px] shadow-lg rounded-xl flex flex-col gap-8">
          <div className="flex flex-col xl:flex-row gap-5">
            <LabelInput
              label="Vehicle Type"
              placeholder="Select Bike Type"
              icon={busIcon}
            />
            <LabelInput
              label="Picking Up Location"
              placeholder="Gate 2 Or Anywhere"
              icon={locationIcon}
            />
            <LabelInput
              label="Picking Up Date"
              placeholder="02/22/2023"
              icon={calendarIcon}
            />
            <LabelInput
              label="Returning Date"
              placeholder="05/22/2023"
              icon={calendarIcon}
            />
          </div>

          <PrimaryButton
            className="w-full lg:w-2/3 mx-0 lg:mx-auto"
            small={false}
            ref={targetRef}
          >
            Find your Bike
          </PrimaryButton>
        </div>
      </div>
      <RentingProcess />
    </div>
  );
};

export default Hero;
