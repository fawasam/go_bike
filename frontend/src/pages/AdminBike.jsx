import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GridViewComponent from "../views/GridViewComponent";
import { toast, Toaster } from "react-hot-toast";
import { UserContext } from "../App";

const AdminBike = () => {
  const [userDetails, setUserDetails] = useState(null);
  let {
    userAuth: { username, email, phone, role },
    setUserAuth,
  } = useContext(UserContext);

  let access_token = useContext(UserContext)?.userAuth?.access_token || null;

  const getNotVerifiedBikeRequest = () => {
    axios
      .get("http://localhost:5000/api/getAllBikes/unVerified")
      .then(({ data }) => {
        setUserDetails(data);
      })
      .catch((response) => {
        toast.error(response.response.data.error);
      });
  };

  useEffect(() => {
    if (access_token) {
      getNotVerifiedBikeRequest();
    }
  }, []);

  return (
    <div className="lg:px-40  px-10 pt-20   h-screen w-full m-auto  items-center">
      <h2 className="text-2xl font-bold">New Bike Request</h2>
      {userDetails?.bikes?.length == 0 ? (
        <h3 className="mt-4 text-lg ">No new Request...</h3>
      ) : (
        <GridViewComponent data={userDetails?.bikes} />
      )}
    </div>
  );
};

export default AdminBike;
