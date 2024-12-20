import React, { useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className=" text-center mb-20 ">
        <p className="text-2xl font-normal text-gray-800 mb-5">
          Send Your Message
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="w-full sm:w-1/2 flex flex-col items-start mx-auto overflow-hidden"
        >
          <div className="flex items-center gap-5 w-full sm:flex-1 my-2 border p-3 rounded-md">
            <FaAddressCard />
            <input
              type="text"
              placeholder="Enter your full name"
              required
              className="w-full sm:flex-1 outline-none rounded-md"
            />
          </div>
          <div className="flex items-start gap-5 w-full sm:flex-1 my-2 border p-3 rounded-md">
            <FaMessage className="mt-1.5" />
            <textarea
              type="text"
              placeholder="Enter your message ..."
              required
              className="w-full sm:flex-1 outline-none rounded-md"
            />
          </div>
          <button
            type="submit"
            className=" bg-black text-white text-x px-10 mt-5 py-2 uppercase rounded-lg"
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewsLetterBox;
