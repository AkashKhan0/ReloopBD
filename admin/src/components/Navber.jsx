import React from "react";
import { assets } from "../assets/assets";

const Navber = ({ setToken }) => {
  return (
    <>
      <div className="flex items-center py-2 px-[4%] justify-between nav-bg ">
        <img
          src={assets.reloop}
          alt="logo"
          className="w-[max(5%,50px)] rounded-full"
        />
        <button
          onClick={() => setToken("")}
          className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm capitalize"
        >
          log out
        </button>
      </div>
    </>
  );
};

export default Navber;
