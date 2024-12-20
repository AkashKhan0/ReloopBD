import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Dadmin = () => {
  const [greeting, setGreeting] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Good Morning");
        setEmoji(assets.morning);
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting("Good Afternoon");
        setEmoji(assets.afternoon);
      } else if (currentHour >= 17 && currentHour < 20) {
        setGreeting("Good Evening");
        setEmoji(assets.evening);
      } else {
        setGreeting("Good Night");
        setEmoji(assets.night);
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000); // Update every 1 minute

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center">
        <h1 className="text-5xl mb-5 font-bold">{greeting} !</h1>
        <img src={emoji} alt="greeting emoji" className="w-2/4" />
      </div>
    </>
  );
};

export default Dadmin;
