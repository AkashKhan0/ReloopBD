import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const Searchbar = () => {
  const { search, setSearch, showsearch, setShowsearch } =
    useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  return showsearch && visible ? (
    <div className="text-center sticky top-0 bg-white z-10">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-5 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          placeholder="Search.."
          className="flex-1 outline-none bg-inherit text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search} alt="search" className="w-4" />
      </div>
      <img
        src={assets.cross}
        alt="cross"
        className="inline w-5 cursor-pointer"
        onClick={() => setShowsearch(false)}
      />
    </div>
  ) : null;
};

export default Searchbar;
