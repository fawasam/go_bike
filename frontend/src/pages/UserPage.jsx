import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../App";
import {
  logOutUser,
  removeFromSession,
  storeInSession,
} from "../common/session";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const UserPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  let access_token = useContext(UserContext)?.userAuth?.access_token || null;

  let {
    userAuth: { username, email, phone },
    setUserAuth,
  } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logOutUser();
    setUserAuth({});
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleFetchUserDetails = () => {
    axios
      .get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(({ data }) => {
        setUserDetails(data[0]);
      })
      .catch((response) => {
        toast.error(response.response.data.error);
      });
  };
  useEffect(() => {
    if (access_token) {
      handleFetchUserDetails();
    }
  }, []);
  console.log(userDetails);

  return !access_token ? (
    <Navigate to="/" />
  ) : (
    <div className="px-20 pt-20  text-center h-screen w-full">
      <div className="flex items-center justify-center flex-col text-center">
        <i className="fi fi-rr-user text-4xl  rounded-full  py-2 px-5 text-center text-black border-primary-green border-2"></i>
        <div className="mt-4">
          <h1>Username - {username}</h1>
          <h1>Email - {email}</h1>
          <h1>Phone - {phone ? phone : "+91xxxxxxxxxx"}</h1>
          <div className="flex items-center justify-center flex-col">
            {userDetails?.bikes?.length > 0 ? (
              <Link to={`/user/${username}/rentee/bikes`}>
                <button
                  className="btn_base text-primary-black border-2 border-primary-green
                rounded-full py-2 px-5 mt-4 hover:bg-primary-green hover:border-transparent hover:text-white"
                >
                  My Bikes
                </button>
              </Link>
            ) : (
              <Link to={`/user/${username}/rentee`}>
                <button
                  className="btn_base text-primary-black border-2 border-primary-green
                rounded-full py-2 px-5 mt-4 hover:bg-primary-green hover:border-transparent hover:text-white"
                >
                  Become a Rentee
                </button>
              </Link>
            )}
            {userDetails?.rental?.length > 0 && (
              <Link to={`/user/${username}/myOrders`}>
                <button
                  className="btn_base text-primary-black border-2 border-primary-green
                rounded-full py-2 px-5 mt-4 hover:bg-primary-green hover:border-transparent hover:text-white"
                >
                  My Order
                </button>
              </Link>
            )}
            <button
              className="btn_base text-primary-black border-2 border-primary-green
            rounded-full py-2 px-5 mt-4 hover:bg-primary-green hover:border-transparent hover:text-white"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
