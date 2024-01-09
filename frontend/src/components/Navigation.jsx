import { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { TbMenuDeep } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { Drawer } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showSignUpDropdown, setShowSignUpDropdown] = useState(false);
  let access_token = useContext(UserContext)?.userAuth?.access_token || null;

  let {
    userAuth: { username },
  } = useContext(UserContext);

  const openDrawer = () => {
    document.body.style.overflowY = "hidden";
    setOpen(true);
  };

  const closeDrawer = () => {
    document.body.style.overflowY = "scroll";
    setOpen(false);
    setShowLoginDropdown(false);
    setShowSignUpDropdown(false);
  };

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
    setShowSignUpDropdown(false);
  };

  const toggleSignUpDropdown = () => {
    setShowSignUpDropdown(!showSignUpDropdown);
    setShowLoginDropdown(false);
  };

  const handleDropdownItemClick = (role) => {
    alert("Selected role: " + role);
  };

  return (
    <div>
      <div className="wrapper flex justify-between items-center py-5">
        <Link to={"/"}>
          <h1>GOBIKE</h1>
        </Link>
        <div className="hidden lg:block">
          <ul className="flex items-center gap-10">
            <Link to={"/"}>
              <li className="link border-primary-green">Home</li>
            </Link>
            <Link to={"/about"}>
              <li className="link border-transparent">About</li>
            </Link>
            <Link to={"/bikes"}>
              <li className="link border-transparent">Bikemodels</li>
            </Link>
            <Link to={"/testimonials"}>
              <li className="link border-transparent">Testimonials</li>
            </Link>
            <Link to={"/faq"}>
              <li className="link border-transparent">FAQ</li>
            </Link>
            <Link to={"/contact"}>
              <li className="link border-transparent">Contact</li>
            </Link>
          </ul>
        </div>

        <TbMenuDeep
          className="block lg:hidden cursor-pointer h-6 w-6"
          onClick={openDrawer}
        />

        <Drawer
          className="px-6 py-12 rounded-r-lg flex flex-col gap-16"
          open={open}
          onClose={closeDrawer}
        >
          <IoClose
            className="absolute right-4 top-4 h-5 w-5 cursor-pointer"
            onClick={closeDrawer}
          />

          <ul className="flex flex-col items-center gap-10">
            <li className="link border-primary-green">Home</li>
            <li className="link border-transparent">About</li>
            <li className="link border-transparent">Bikemodels</li>
            <li className="link border-transparent">Testimonials</li>
            <li className="link border-transparent">Contact</li>
          </ul>

          <div className="w-full h-[2px] bg-primary-green rounded-full" />

          {access_token ? (
            <div className="flex flex-col gap-10 items-center">
              <Link to={`/user/${username}`}>
                <button className="btn_base text-primary-black hover:text-primary-green">
                  <i className="fi fi-rr-user mr-2"></i>
                  Profile
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-10 items-center">
              <Link to={"/login"}>
                <button className="btn_base text-primary-black hover:text-primary-green">
                  Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button
                  className="btn_base text-primary-black border-2 border-primary-green
              rounded-full py-2 px-5 hover:bg-primary-green hover:border-transparent hover:text-white"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </Drawer>

        {/* web view  */}
        {!access_token ? (
          <div className="hidden lg:flex items-center gap-[30px]">
            <Link to={"/login"}>
              <button className="btn_base text-primary-black hover:text-primary-green">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button
                className="btn_base text-primary-black border-2 border-primary-green
            rounded-full py-2 px-5 hover:bg-primary-green hover:border-transparent hover:text-white"
              >
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-[30px]">
            <Link to={`/user/${username}`}>
              <button className="btn_base text-primary-black hover:text-primary-green">
                <i className="fi fi-rr-user mr-2"></i>
                Profile
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
