import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Title from "../components/Title";
// import { assets } from "../assets/assets";
import {
  FaAddressCard,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const socialLinks = [
  { icon: FaFacebook, url: "https://facebook.com", color: "text-blue-600" },
  { icon: FaInstagram, url: "https://instagram.com", color: "text-pink-500" },
  { icon: FaYoutube, url: "https://youtube.com", color: "text-red-600" },
  {
    icon: FaWhatsapp,
    url: "https://api.whatsapp.com/send/?phone=%2B8801850219432&text&type=phone_number&app_absent=0",
    color: "text-green-500",
  },
  { icon: FaLinkedin, url: "https://linkedin.com", color: "text-blue-700" },
];

const Contact = () => {
  const form = useRef();
  const [buttonText, setButtonText] = useState("Submit");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNavigation = (url) => {
    window.open(url, "_blank"); // Open the URL in a new tab
  };

  const sendEmail = (e) => {
    e.preventDefault();

    setButtonText("Sending...");

    emailjs
      .sendForm("service_qorm2jq", "template_ykjmjdm", form.current, {
        publicKey: "a0g95wbOgrGUPiapS",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          form.current.reset();
          setButtonText("Success");
          setIsSuccess(true);

          setTimeout(() => {
            setButtonText("Submit");
            setIsSuccess(false);
          }, 3000);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setButtonText("Submit");
          setIsSuccess(false);
        }
      );
  };

  return (
    <>
      <div className="text-2xl text-center pt-10 mb-5">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full sm:w-1/2 flex flex-col items-start mx-auto overflow-hidden my-10"
      >
        <div className="flex items-center gap-5 w-full sm:flex-1 my-2 border p-3 rounded-md">
          <FaAddressCard />
          <input
            type="text"
            name="user_name"
            placeholder="Enter your full name"
            required
            className="w-full sm:flex-1 outline-none rounded-md"
          />
        </div>
        <div className="flex items-start gap-5 w-full sm:flex-1 my-2 border p-3 rounded-md">
          <FaMessage className="mt-1.5" />
          <textarea
            type="text"
            name="message"
            placeholder="Enter your message ..."
            required
            className="w-full sm:flex-1 outline-none rounded-md"
          />
        </div>
        <button
          type="submit"
          className={`bg-black text-white text-x px-10 mt-5 py-2 uppercase rounded-lg cursor-pointer ${
            isSuccess ? "bg-green-500" : "hover:bg-slate-800"
          }`}
        >
          {buttonText}
        </button>
      </form>

      <h1 className="text-center text-3xl uppercase text-gray-700 font-medium my-10 ">
        keep in touch
      </h1>

      <div className=" flex items-center justify-center gap-10 mb-20 flex-wrap">
        {socialLinks.map(({ icon: Icon, url, color }, index) => (
          <Icon
            key={index}
            className={`contact_scl ${color} text-4xl cursor-pointer`}
            onClick={() => window.open(url, "_blank")}
          />
        ))}
      </div>
    </>
  );
};

export default Contact;
