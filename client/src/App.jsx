import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import Career from "./pages/Career";
import Livechat from "./pages/Livechat";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <>
      <div className="relative">
        <Livechat />
        <ToastContainer />
        <Navbar />
        <Searchbar />
        <div className="px-4 sm:px-[5vw] md:px=[7vw] lg:px-[9vw]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/career" element={<Career />} />
            <Route path="/profile" element={<Profile token={token} />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/product/:productId" element={<Product />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
