import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [currentState, setCurrentState] = useState("login"); // sign up
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "sign up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-start h-screen w-[90%] sm:max-w-96 m-auto my-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prate-regular text-3xl capitalize">{currentState}</p>
        </div>
        {currentState === "login" ? (
          ""
        ) : (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800 outline-none rounded-md"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        )}

        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800 outline-none rounded-md"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800 outline-none rounded-md"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          {currentState === "login" ? (
            <p className="capitalize cursor-pointer">Forgot your password?</p>
          ) : (
            <p className="capitalize cursor-pointer">
              already have an account?
            </p>
          )}

          {/* login or create account */}
          {currentState === "login" ? (
            <p
              onClick={() => setCurrentState("sign up")}
              className="capitalize cursor-pointer"
            >
              create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("login")}
              className="capitalize cursor-pointer"
            >
              login here
            </p>
          )}
        </div>
        <div className="flex gap-5">
          <button className="capitalize bg-black text-white font-light px-8 py-2 mt-4 rounded-md">
            {currentState === "login" ? "login" : "sign up"}
          </button>
          {currentState === "login" && (
            <button
              className="capitalize bg-black text-white font-light px-8 py-2 mt-4 rounded-md"
              onClick={() => setCurrentState("sign up")}
            >
              sign up
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
