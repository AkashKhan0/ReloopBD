import React from "react";
import { assets } from "../assets/assets";
import { TbLogout } from "react-icons/tb";

const Navber = ({ setToken }) => {
  return (
    <>
      <div className="flex items-center py-2 px-[4%] justify-between nav-bg ">
        <div className="flex items-center gap-2 flex-1">
          <img
            src={assets.reloop}
            alt="logo"
            className="w-[max(5%,50px)] rounded-full"
          />
          <h1 className="text-4xl font-semibold text-slate-400">ReloopBD</h1>
        </div>
        <div className="flex items-center justify-end flex-1">
          <button
            onClick={() => setToken("")}
            className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full sm:text-sm capitalize font-medium text-lg flex items-center gap-2"
          >
            log out <TbLogout className="text-lg" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navber;
