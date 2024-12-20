import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // const location = useLocation();
  const [visible, setVisible] = useState(false);
  const {
    setShowsearch,
    getCartCount,
    token,
    setToken,
    navigate,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  useEffect(() => {
    setIsDropdownVisible(false);
  }, [location.pathname]);

  return (
    <>
      <div className="flex items-center justify-between py-5 px-4 font-medium sm:px-[5vw] md:px=[7vw] lg:px-[9vw] nav-bg mb-0">
        <Link to="/">
          <img src={assets.reloop} alt="logo" className="w-10 rounded-full" />
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm text-white">
          {/* home */}
          <NavLink to="/" className=" flex flex-col items-center gap-1 ">
            <p className=" uppercase "> home</p>
            <hr className=" w-2/4 border-none h-[1.5px] hr-bg hidden " />
          </NavLink>
          {/* collection */}
          <NavLink
            to="/collection"
            className=" flex flex-col items-center gap-1 "
          >
            <p className=" uppercase "> collection</p>
            <hr className=" w-2/4 border-none h-[1.5px] hr-bg hidden " />
          </NavLink>
          {/* about */}
          <NavLink to="/about" className=" flex flex-col items-center gap-1 ">
            <p className=" uppercase "> about</p>
            <hr className=" w-2/4 border-none h-[1.5px] hr-bg hidden " />
          </NavLink>

          {/* contact */}
          <NavLink to="/contact" className=" flex flex-col items-center gap-1 ">
            <p className=" uppercase "> contact</p>
            <hr className=" w-2/4 border-none h-[1.5px] hr-bg hidden " />
          </NavLink>
        </ul>

        {/* navbar icons */}
        <div className="flex items-center gap-6">
          {/* search */}
          <img
            src={assets.search}
            alt="search"
            className={`w-5 cursor-pointer ${
              location.pathname === "/collection" ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setShowsearch(true)}
          />

          <div className=" group relative ">
            <img
              onClick={() => (token ? toggleDropdown() : navigate("/login"))}
              src={assets.person}
              alt="person"
              className="w-5 cursor-pointer"
            />
            {token && isDropdownVisible && (
              <div className="absolute dropdown-menu right-0 pt-4 z-20">
                <div className=" flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ">
                  <p
                    onClick={() => navigate("/profile")}
                    className=" cursor-pointer hover:text-black capitalize"
                  >
                    profile
                  </p>
                  <p
                    onClick={() => navigate("/order")}
                    className=" cursor-pointer hover:text-black capitalize"
                  >
                    orders
                  </p>
                  <p
                    onClick={logout}
                    className=" cursor-pointer hover:text-black capitalize"
                  >
                    log-out
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className=" relative ">
            <img src={assets.cart} alt="shop-cart" className="w-5 min-w-5" />
            <p className=" absolute right-[-8px] bottom-[-8px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ">
              {getCartCount()}
            </p>
          </Link>
          <img
            onClick={() => setVisible(true)}
            src={assets.menu}
            alt="menu-bar"
            className="w-5 cursor-pointer sm:hidden"
          />
        </div>
        {/* side bar for small screen */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full z-30" : "w-0"
          }`}
        >
          <div className=" flex flex-col text-gray-600 ">
            <div
              className=" flex items-center justify-end gap-4 p-3 cursor-pointer"
              onClick={() => setVisible(false)}
            >
              <img
                src={assets.cross}
                alt="cross"
                className=" w-5 cursor-pointer "
              />
            </div>
            <NavLink
              to="/"
              className="uppercase py-2 pl-6 border"
              onClick={() => setVisible(false)}
            >
              home
            </NavLink>
            <NavLink
              to="/collection"
              className="uppercase py-2 pl-6 border"
              onClick={() => setVisible(false)}
            >
              collection
            </NavLink>
            <NavLink
              to="/about"
              className="uppercase py-2 pl-6 border"
              onClick={() => setVisible(false)}
            >
              about
            </NavLink>
            <NavLink
              to="/contact"
              className="uppercase py-2 pl-6 border"
              onClick={() => setVisible(false)}
            >
              contact
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
