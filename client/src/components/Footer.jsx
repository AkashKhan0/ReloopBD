import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  const { navigate } = useContext(ShopContext);

  return (
    <>
      {/* <hr className="mt-20" /> */}
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-14 text-sm px-4 py-5 font-medium sm:px-[5vw] md:px=[7vw] lg:px-[9vw] footer-bg">
        {/* footer logo & name */}
        <div>
          <img
            src={assets.reloop}
            alt="logo"
            className="mb-5 w-16 rounded-full"
          />
          <p className="w-full md:w-2/3 text-white">
            Craft for comfort, Recycled for change.
          </p>
        </div>

        {/* footer social media Icon */}
        <div className="flex flex-col justify-evenly">
          <div className="flex gap-2 cursor-pointer items-center">
            <FaFacebookSquare className="socialIcon" />
            <p className="social_name text-white font-medium capitalize">
              facebook
            </p>
          </div>
          <div className="flex gap-2 cursor-pointer items-center">
            <FaInstagramSquare className="socialIcon" />
            <p className="social_name text-white font-medium capitalize">
              instagram
            </p>
          </div>
          <div className="flex gap-2 cursor-pointer items-center">
            <FaYoutube className="socialIcon" />
            <p className="social_name text-white font-medium capitalize">
              youTube
            </p>
          </div>
        </div>

        {/* fotter menu */}
        <div>
          <p className="text-xl font-medium mb-5 uppercase text-white">
            company
          </p>
          <ul className="flex flex-col gap-1 text-white">
            <li className="cursor-pointer" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="cursor-pointer" onClick={() => navigate("/about")}>
              About Us
            </li>
            <li className="cursor-pointer" onClick={() => navigate("/order")}>
              Orders
            </li>
            <li className="cursor-pointer" onClick={() => navigate("/career")}>
              Career
            </li>
            <li className="cursor-pointer" onClick={() => navigate("/privacy")}>
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* get in touch */}
        <div>
          <p className="text-xl font-medium mb-5 uppercase text-white">
            get in touch
          </p>
          <ul className="flex flex-col gap-1 text-white">
            <div className="flex flex-row items-center gap-5">
              <img src={assets.call} alt="call" className="w-5" />
              <li>+8801779095690</li>
            </div>
            <div className="flex flex-row items-center gap-5">
              <img src={assets.mail} alt="mail" className="w-5" />
              <li>reloopbd@gmail.com</li>
            </div>
          </ul>
        </div>
      </div>
      <div className="footer-bg">
        <hr />
        <p className="py-5 text-sm text-center text-white">
          Copyright 2024 - reloopbd.com - All right Reserved
        </p>
      </div>
      {/* footer chatboot */}
      {/* <div className="fixed bottom-5 right-5 ">
        <img
          src={assets.whatsapp}
          alt="whatsapp"
          className="w-20 cursor-pointer rounded-full"
        />
      </div> */}
    </>
  );
};

export default Footer;
