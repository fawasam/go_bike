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
              <Route path="/bikes" element={<CarsForRental />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/user/:username" element={<UserPage />} />
              <Route path="/user/:username/rentee" element={<RenteePage />} />
            </Routes>
            <Footer />
          </BikeContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
