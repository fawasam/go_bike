import React, { createContext, useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { BikeContext, UserContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";

const SingleBikePage = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [bikeData, setBikeData] = useState(null);
  let access_token = useContext(UserContext)?.userAuth?.access_token || null;
  let {
    userAuth: { username, email, phone, role },
    setUserAuth,
  } = useContext(UserContext);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [notes, setNotes] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  function daysBetween(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const diff = Math.abs(endDate - startDate);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24) + 1); // Add 1 to include both start and end
    return days;
  }
  const calculateCost = () => {
    const days = daysBetween(startDate, endDate);
    const costPerDay = bikeData?.price; // Replace with your actual cost per day
    setTotalCost(days * costPerDay);
  };

  const getAllBikesData = () => {
    axios
      .get(`https://go-bike-backend.onrender.com/api/getBike/${id}`)
      .then(({ data: { bikes } }) => {
        setBikeData(bikes);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!access_token) {
      toast.error("Please login to rent a bike");
    }
    var loadingToast = toast.loading("Submiting....");

    axios
      .post(
        `https://go-bike-backend.onrender.com/api/rentABike/${id}`,
        {
          startDate,
          endDate,
          cost: totalCost,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        toast.dismiss(loadingToast);
        toast.success(
          "Bike Rental Registered successfully👍, Will contact you soon"
        );
        setStartDate(null);
        setEndDate(null);
        setTotalCost(0);
        setNotes(null);
        navigate(`/user/${username}`);
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        console.log(err);
        toast.error(err.response.data.error);
      });
  };

  const handleVerifyBike = (e) => {
    var loadingToast = toast.loading("Verifying....");
    axios
      .post(
        `https://go-bike-backend.onrender.com/api/updateBike/${id}`,
        {
          isVerified: true,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        toast.dismiss(loadingToast);
        toast.success("Bike Verification finished");
        navigate(`/user/${username}`);
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        console.log(err);
        toast.error(err.response.data.error);
      });
  };

  const handleResetAvailablityBike = () => {
    var loadingToast = toast.loading("Changing....");
    axios
      .post(
        `https://go-bike-backend.onrender.com/api/updateBike/${id}`,
        {
          available: true,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        toast.dismiss(loadingToast);
        toast.success("Bike Availablity Changed");
        navigate(`/user/${username}`);
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        console.log(err);
        toast.error(err.response.data.error);
      });
  };

  const handleDeleteBike = (e) => {
    var loadingToast = toast.loading("Removing....");
    axios
      .delete(
        `https://go-bike-backend.onrender.com/api/getBike/${id}`,

        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        toast.dismiss(loadingToast);
        toast.success("Bike Deleted Successfully 👍");
        navigate(`/user/${username}`);
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        console.log(err);
        toast.error(err.response.data.error);
      });
  };
  useEffect(() => {
    getAllBikesData();

    calculateCost();
  }, [id, startDate, endDate]);

  return (
    <>
      {!bikeData ? (
        <h2 className="text-center mt-4">Loading..</h2>
      ) : (
        <div className="lg:px-40  px-10 pt-20  h-full w-full m-auto  items-center">
          <div className="flex items-center justify-center gap-40 md:flex-row flex-col">
            <div className="gap-6 capitalize  lg:col-span-2 ">
              <h2 className="text-2xl capitalize font-bold">
                {bikeData.model}
              </h2>
              <img
                src={bikeData.image}
                alt={bikeData.model}
                className="h-80 w-80 aspect-square rounded-md my-6 object-fit"
              />
              <p>Type : {bikeData.type}</p>
              <p>Brand : {bikeData.brand}</p>
              <p>Year : {bikeData.year}</p>
              <p>Price : {bikeData.price}/day</p>
              <p>Color : {bikeData.color}</p>
              <p>description : {bikeData.description}</p>
              <p>available : {bikeData.available ? "yes" : "no"}</p>
            </div>
            {role == "renter" || role == "rentee" || role == null ? (
              <div className="col-span-4 gap-y-3">
                <h2 className="font-bold text-xl">Rental Information</h2>
                <div className="mt-6 gap-y-4 gap-3 ">
                  <form action="">
                    <p className="my-4">StartDate :</p>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      required
                      value={startDate}
                      onChange={handleChange}
                    />
                    <p className="my-4">EndDate :</p>
                    <input
                      type="date"
                      required
                      id="endDate"
                      name="endDate"
                      value={endDate}
                      onChange={handleChange}
                    />
                    <p className="my-4">Total Cost : </p>

                    <input
                      type="text"
                      required
                      id="cost"
                      name="cost"
                      value={totalCost == NaN ? "0" : totalCost}
                      disabled
                      defaultValue={0}
                      // value={daysBetween()}
                    />
                    <p className="my-4">Notes : </p>
                    <textarea
                      type="text"
                      id="notes"
                      name="notes"
                      value={notes}
                      onChange={handleChange}
                    />
                    {!bikeData.available ? (
                      <p className="capitalize text-gray- ">
                        not available for renting
                      </p>
                    ) : (
                      <button
                        // type="submit"
                        disabled={!bikeData.available}
                        onClick={handleSubmit}
                        className={`flex w-22 mt-4 justify-center rounded-mdt   px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:green_text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                          !bikeData.available
                            ? "bg-primary-black"
                            : "bg-primary-green"
                        }`}
                      >
                        Submit
                      </button>
                    )}
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <button
                  className="btn_base text-primary-black border-2 border-primary-green
                rounded-full py-2 px-5 mt-4 hover:bg-primary-green hover:border-transparent hover:text-white"
                  onClick={handleVerifyBike}
                >
                  Verified
                  <i className="fi fi-br-check"></i>
                </button>
                <button
                  className="btn_base text-primary-black border-2 border-primary-green
                rounded-full py-2 px-5 mt-4 hover:bg-primary-green hover:border-transparent hover:text-white"
                  onClick={handleResetAvailablityBike}
                >
                  Update
                  <i className="fi fi-rr-user-gear"></i>
                </button>
                <button
                  className="btn_base text-primary-black border-2 border-primary-green
                rounded-full py-2 px-5 mt-4 hover:bg-primary-green hover:border-transparent hover:text-white"
                  onClick={handleDeleteBike}
                >
                  Delete
                  <i className="fi fi-rr-trash"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBikePage;
