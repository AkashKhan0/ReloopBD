import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import winter1 from "../assets/winterM1.png";
import winter2 from "../assets/winterM2.png";
import winter3 from "../assets/winterW.png";
import winter4 from "../assets/winterW1.png";
import winter5 from "../assets/winterK1.png";
import winter6 from "../assets/winterK2.png";

const data = [
  {
    title: "Mens Winter Jacket",
    description: "EMP Signature Collection | Slayer Winter Jacket",
    image: winter1,
  },
  {
    title: "Mens Winter Jacket",
    description: "New Stylish Premium Winter Jacket With Pant Set For Men",
    image: winter2,
  },
  {
    title: "Ladies Jacket",
    description: "Fashionable Winter Collection Ladies Jacket",
    image: winter3,
  },
  {
    title: "Ladies Jacket",
    description: "Fashionable Winter Collection Ladies Jacket",
    image: winter4,
  },
  {
    title: "Kids Collection",
    description: "Fashionable Winter Collection for Boys & Girls Baby",
    image: winter5,
  },
  {
    title: "Kids Collection",
    description: "Leather jacket Outerwear Child Coat, leather jacket",
    image: winter6,
  },
];

const Hero = () => {
  const { navigate } = useContext(ShopContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the index every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Manually change to the next item
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row mt-5 lg:h-96">
        {/* hero left */}
        <div className="flex-1 w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 ">
          <div className=" text-[#414141] ">
            <div className=" flex items-center gap-2 ">
              <p className=" font-medium text-2xl lg:text-3xl md:text-base uppercase ">
                {data[currentIndex].title}
              </p>
            </div>
            <h1 className=" text-xl sm:py-3 lg:text-xl leading-relaxed uppercase mb-2">
              {data[currentIndex].description}
            </h1>
            <div className=" flex items-center gap-2 ">
              <p
                className=" font-semibold text-sm md:text-base uppercase bg-black text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => navigate("/collection")}
              >
                shop now
              </p>
            </div>
          </div>
        </div>
        {/* hero right */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={data[currentIndex].image}
            alt={`Slide ${currentIndex + 1}`}
            className="max-w-full max-h-full"
          />
        </div>
        {/* <Slider /> */}
      </div>
    </>
  );
};

export default Hero;
