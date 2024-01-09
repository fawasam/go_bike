import { Navigation } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CarsForRental,
  Contact,
  FAQ,
  Hero,
  Posts,
  Pricing,
  RentingProcess,
  Services,
  Testimonials,
  Footer,
} from "./views";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/AdminLogin";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import { toast, Toaster } from "react-hot-toast";
import UserPage from "./pages/UserPage";
import RenteePage from "./pages/RenteePage";
import SingleBikePage from "./pages/SingleBikePage";
import RenteeBikePage from "./pages/RenteeBikePage";
import AdminBike from "./pages/AdminBike";
import AdminRental from "./pages/AdminRental";
import UserOrder from "./pages/UserOrder";
export const UserContext = createContext({});
export const BikeContext = createContext();

function App() {
  const [userAuth, setUserAuth] = useState({ access_token: null });
  const [bikesData, setBikesData] = useState([]);

  useEffect(() => {
    let userInSession = lookInSession("user");

    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    } else {
      setUserAuth({ access_token: null });
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userAuth, setUserAuth }}>
          <BikeContext.Provider value={{ bikesData, setBikesData }}>
            <Navigation />
            <Toaster />
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/user/:username" element={<UserPage />} />
              <Route path="/user/:username/rentee" element={<RenteePage />} />
              <Route path="/user/:username/myOrders" element={<UserOrder />} />
              <Route
                path="/user/:username/rentee/bikes"
                element={<RenteeBikePage />}
              />
              <Route path="/bikes" element={<CarsForRental />} />
              <Route path="/bike/:id" element={<SingleBikePage />} />
              <Route path="/admin/bikes" element={<AdminBike />} />
              <Route path="/admin/rental" element={<AdminRental />} />
            </Routes>
            <Footer />
          </BikeContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
