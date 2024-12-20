import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <>
      <div className="w-[18%] min-h-screen bg-slate-200">
        <div className="flex flex-col gap-4 pt-6 pl-[5%] mr-[5%] text-[15px]">
          {/* add navlink */}
          <NavLink
            to="/add"
            className="flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-md"
          >
            <img src={assets.add_icon} alt="add_icon" className="w-5 h-5" />
            <p className="hidden md:block capitalize">add items</p>
          </NavLink>

          {/* list navlink */}
          <NavLink
            to="/list"
            className="flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-md"
          >
            <img src={assets.order_icon} alt="add_icon" className="w-5 h-5" />
            <p className="hidden md:block capitalize">list items</p>
          </NavLink>

          {/* order navlink */}
          <NavLink
            to="/orders"
            className="flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-md"
          >
            <img src={assets.order_icon} alt="add_icon" className="w-5 h-5" />
            <p className="hidden md:block capitalize">orders</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
