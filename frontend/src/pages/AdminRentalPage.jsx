import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GridViewComponent from "../views/GridViewComponent";
import { toast, Toaster } from "react-hot-toast";
import { UserContext } from "../App";
import { getFullDay } from "../common/date";
import { Link, useNavigate, Navigate } from "react-router-dom";

const AdminRentalPage = () => {
  let access_token = useContext(UserContext)?.userAuth?.access_token || null;
  const [rentalDetails, setRentalDetails] = useState(null);
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

      <div>
        {rentalDetails?.rental?.map((rental, i) => {
          //   setPhoneNumber(rental.bike.user.phone);
          //   setRentalId(rental._id);
          return (
            <div key={i} className="flex">
              <div className="border p-4 lg:flex md:flex gap-6">
                <div>
                  <p className="font-bold mb-2">Bike Details</p>
                  <img
                    src={rental.bike.image}
                    alt={rental.bike.model}
                    className="h-60 w-60 object-cover"
                  />
                </div>
                <div>
                  <h2>{rental.bike.model}</h2>
                  <h2>{rental.bike.type}</h2>
                  <h2>{rental.bike.brand}</h2>
                  <h2>Start Date :{getFullDay(rental.startDate)}</h2>
                  <h2>End Date :{getFullDay(rental.endDate)}</h2>
                  <p>Total cost :{rental.cost}</p>
                  <p>Notes :{rental.notes ? rental.notes : "Nothing"}</p>

                  <p className="font-bold mt-4 my-2">User Details</p>
                  <h1>Username :{rental.bike.user.username}</h1>
                  <h1>Email :{rental.bike.user.email}</h1>
                  <h1>Phone :{rental.bike.user.phone}</h1>
                </div>
                <div>
                  <div className="flex flex-col">
                    <button
                      className="btn_base text-primary-black border-2 border-primary-green
                rounded-full py-2 px-5 mt-4 hover:bg-primary-green hover:border-transparent hover:text-white"
                      // onClick={handelVerifyRentalRequest}
                    >
                      Verify
                      <i className="fi fi-rr-check text-sm ml-2"></i>
                    </button>
                    <button
                      className="btn_base text-primary-black border-2 border-primary-green
                rounded-full py-2 px-5 mt-4 hover:bg-primary-green hover:border-transparent hover:text-white"
                      // onClick={handleCall}
                    >
                      Contact
                      <i className="fi fi-rr-phone text-sm ml-2"></i>
                    </button>
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

export default AdminRentalPage;
