import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GridViewComponent from "../views/GridViewComponent";
import { toast, Toaster } from "react-hot-toast";
import { UserContext } from "../App";
import { getFullDay } from "../common/date";
import { Link, useNavigate, Navigate } from "react-router-dom";

const AdminRental = () => {
  const navigate = useNavigate();
  const [rentalDetails, setRentalDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState("pending");

  let {
    userAuth: { username, email, phone, role },
    setUserAuth,
  } = useContext(UserContext);

  let access_token = useContext(UserContext)?.userAuth?.access_token || null;

  const handelVerifyRentalRequest = (id) => {
    console.log(id);
    var loadingToast = toast.loading("Verifying....");

    axios
      .post(
        `https://go-bike-backend.onrender.com/api/updateRental`,
        {
          _id: id,
          paymentStatus: selectedOption,
          returned: false,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        toast.dismiss(loadingToast);
        toast.success("Rental Verification finished");
        navigate(`/user/${username}`);
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        console.log(err);
        toast.error(err.response.data.error);
      });
  };

  const getNotVerifiedRentalRequest = async () => {
    await axios
      .get(
        "https://go-bike-backend.onrender.com/api/getAllRentals/unVerified",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        setRentalDetails(data);
      })
      .catch((response) => {
        toast.error(response.response.data.error);
      });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected option:", selectedOption);
  };

  useEffect(() => {
    if (access_token) {
      getNotVerifiedRentalRequest();
    }
  }, []);

  return !rentalDetails ? (
    <h2 className="text-center mt-4">Loading...</h2>
  ) : (
    <div className="lg:px-40  px-10 pt-20   h-full w-full m-auto  items-center">
      <h2 className="text-2xl font-bold mb-4">New Rental Request</h2>
      <div className=" ">
        {rentalDetails?.rental?.map((rental, i) => {
          // setPhoneNumber(rental.bike.user.phone);
          // setRentalId(rental._id);
          console.log(rental);
          return (
            <div key={i} className=" my-6">
              <div className="border p-4 lg:flex md:flex gap-6 justify-around">
                <div>
                  <p className="font-bold mb-2">Bike Details</p>
                  <img
                    src={rental.bike.image}
                    alt={rental.bike.model}
                    className="h-60 w-60 object-cover"
                  />
                </div>
                <div className="text-center">
                  <h2 className="font-medium">{rental.bike.model}</h2>
                  <h2>{rental.bike.type}</h2>
                  <h2>{rental.bike.brand}</h2>
                  <h2>Start Date :{getFullDay(rental.startDate)}</h2>
                  <h2>End Date :{getFullDay(rental.endDate)}</h2>
                  <p>Total cost :{rental.cost}</p>
                  <p>Notes :{rental.notes ? rental.notes : "Nothing"}</p>
                  <p>PaymentStatus :{rental.paymentStatus}</p>

                  <p className="font-bold mt-4 my-2">User Details</p>
                  <h1>Username :{rental.bike.user.username}</h1>
                  <h1>Email :{rental.bike.user.email}</h1>
                  <h1>Phone :{rental.bike.user.phone}</h1>
                </div>
                <div>
                  <div className="flex flex-col">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative inline-block text-left my-2">
                        <div className="my-2">
                          <span className="rounded-md shadow-sm">
                            <select
                              onChange={handleOptionChange}
                              value={selectedOption}
                              className="block appearance-none w-full bg-white border border-gray-300 
                           hover:border-gray-500 px-4 py-2 my-2 pr-8 rounded leading-tight 
                           focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                              <option value="pending">pending</option>
                              <option value="paid">paid</option>
                              <option value="cancelled">cancelled</option>
                            </select>
                          </span>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn_base ml-2 text-primary-black border-2 border-primary-green rounded-md
                 py-2 px-5 mt-4 hover:bg-primary-green hover:border-transparent hover:text-white"
                        onClick={() => handelVerifyRentalRequest(rental._id)}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminRental;
