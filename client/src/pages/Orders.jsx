import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { assets } from "../assets/assets";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <>
      <div className="border-t py-16 min-h-screen">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDER"} />
        </div>
        <div>
          {orderData.length > 0 ? (
            orderData.map((item, index) => (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  <img
                    src={item.image[0]}
                    alt="products"
                    className="w-16 sm:w-20"
                  />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p>
                        {currency}
                        {item.price}
                      </p>
                      <p>Quantity : {item.quantity}</p>
                      <p className="capitalize">Size : {item.size}</p>
                    </div>
                    <p className="mt-1">
                      Date :{" "}
                      <span className="text-gray-400">
                        {new Date(item.date).toDateString()}
                      </span>
                    </p>
                    <p className="mt-1">
                      Payment :
                      <span className="text-gray-400">
                        {" "}
                        {item.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between w-1/2">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className="border px-2 py-2 text-sm font-medium rounded-md capitalize"
                  >
                    Track order
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Empty state if there are no orders
            <div className="flex flex-col items-center justify-center mt-20">
              <img src={assets.empty} alt="No orders" className="w-1/3" />
              <p className="text-gray-500 text-lg mt-4">
                You have no orders yet.
              </p>
              <button
                onClick={() => (window.location.href = "/collection")} // Redirect to the homepage or shop
                className="bg-black text-white text-sm mt-6 px-8 py-3 rounded-3xl uppercase"
              >
                Go to Shop
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
