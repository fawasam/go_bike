import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { BikeContext, UserContext } from "../App";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import GridViewComponent from "../views/GridViewComponent";
import OrderViewComponent from "../components/OrderViewComponent";

const UserOrder = () => {
  const [userDetails, setUserDetails] = useState(null);

  let access_token = useContext(UserContext)?.userAuth?.access_token || null;
  let {
    userAuth: { username, email, phone },
    setUserAuth,
  } = useContext(UserContext);

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
    } else {
      <Navigate to="/" />;
    }
  }, []);
  console.log(userDetails);
  return userDetails?.length > 0 ? (
    <>Loading...</>
  ) : (
    <div className="lg:px-40  px-10 pt-20  h-full w-full m-auto  items-center">
      <div className="my-4 flex flex-col">
        <h2 className="text-2xl  font-bold">My Order</h2>
        <Link to={`/bikes`} className="py-4">
          <button
            className="btn_base text-primary-black border-2 border-primary-green
                rounded-full py-2 px-5 mt-4 hover:bg-primary-green hover:border-transparent hover:text-white"
          >
            Rent Now
            <i className="fi fi-rr-plus text-sm ml-2"></i>
          </button>
        </Link>
      </div>
      <>
        <OrderViewComponent data={userDetails?.rental} />
      </>
    </div>
  );
};

export default UserOrder;