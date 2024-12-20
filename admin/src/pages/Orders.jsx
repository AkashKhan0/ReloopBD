import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  // Fetch orders from backend
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  return (
    <>
      <div>
        <h3 className="capitalize">order page</h3>
        <div className="">
          {orders.map((order, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
              key={index}
            >
              <img
                src={assets.parcel_icon}
                alt="parcel_icon"
                className="w-12"
              />
              <div className="">
                <div className="">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p
                          className="py-0.5 font-semibold flex gap-2"
                          key={index}
                        >
                          <img
                            src={assets.mal}
                            alt=""
                            className="h-5 w-5 mt-0.5"
                          />
                          {item.name} x {item.quantity}
                          <span className="uppercase"> {item.size} </span>
                        </p>
                      );
                    } else {
                      return (
                        <p
                          className="py-0.5 font-semibold flex gap-2"
                          key={index}
                        >
                          <img
                            src={assets.mal}
                            alt=""
                            className="h-5 w-5 mt-0.5"
                          />
                          {item.name} x {item.quantity}
                          <span className="uppercase"> {item.size} </span>,
                        </p>
                      );
                    }
                  })}
                </div>
                <p className="mt-3 mb-2 font-medium flex gap-2 items-center">
                  <img src={assets.user} alt="" className="h-3 w-3" />
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="">
                  <p className="">{order.address.street + ","}</p>
                  <p className="">
                    {order.address.city +
                      "," +
                      order.address.state +
                      "," +
                      order.address.country +
                      "," +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="">{order.address.phone}</p>
              </div>
              <div className="">
                <p className="text-sm sm:text-[15px]">
                  Items: {order.items.length}
                </p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p className="">
                  Payment: {order.payment ? "Done" : "Pending"}
                </p>
                <p className="">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm sm:text-[15px]">
                {currency}
                {order.amount}
              </p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="p-2 font-semibold"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;