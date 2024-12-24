import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { IoPersonCircle } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";

const Profile = () => {
  const { backendUrl, token, currency, orderData } = useContext(ShopContext);
  const [userData, setUserData] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/profile`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setUserData(response.data.user);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  return (
    <div className="p-6 min-h-screen">
      {userData && (
        <div className="my-4 text-lg font-normal text-slate-800 flex flex-col w-full items-center justify-center">
          <IoPersonCircle className="text-8xl" />
          <h2 className="text-xl font-semibold w-fit">{userData.name}</h2>
          {/* <p>Name: {userData.name}</p> */}
          <p className="flex items-center gap-2 w-fit">
            <IoMdMail /> {userData.email}
          </p>
        </div>
      )}
      <h3 className="text-xl font-semibold mt-6">Purchased Products</h3>
      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div key={index} className="py-4 border-b flex gap-5 flex-wrap">
              <img
                src={item.image[0]}
                alt="product"
                className="w-16 max-h-16 sm:w-20"
              />
              <div className="flex flex-col gap-5 flex-wrap">
                <div className="flex flex-wrap gap-5">
                  <p>{item.name}</p>
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="flex flex-wrap gap-5">
                  <p>Status: {item.status}</p>
                  <p>Payment Method: {item.paymentMethod}</p>
                  <p>Date: {new Date(item.date).toDateString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products purchased yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
