import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GridViewComponent from "../views/GridViewComponent";
import { toast, Toaster } from "react-hot-toast";
import { UserContext } from "../App";

const AdminRental = () => {
  const [rentalDetails, setRentalDetails] = useState(null);
  let {
    userAuth: { username, email, phone, role },
    setUserAuth,
  } = useContext(UserContext);

  let access_token = useContext(UserContext)?.userAuth?.access_token || null;

  const getNotVerifiedRentalRequest = () => {
    axios
      .get("http://localhost:5000/api/getAllRentals/unVerified", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
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
  console.log(rentalDetails);
  return !rentalDetails ? (
    <>Loading...</>
  ) : (
    <div className="lg:px-40  px-10 pt-20   h-screen w-full m-auto  items-center">
      <h2 className="text-2xl font-bold">New Rental Request</h2>
      <div>
        {rentalDetails?.rental?.map((rental, i) => {
          return <div key={i}>{rental.cost}</div>;
        })}
      </div>
    </div>
  );
};

export default AdminRental;
