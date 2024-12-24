import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    buyNowProduct,
    setBuyNowProduct,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [buttonState, setButtonState] = useState("default");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
    country: "",
    state: "",
    zipcode: "",
    street: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setButtonState("loading"); // Set loading state
    try {
      let orderItems = [];

      if (buyNowProduct) {
        orderItems.push(buyNowProduct);
      } else {
        for (const items in cartItems) {
          for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
              const itemInfo = structuredClone(
                products.find((product) => product._id === items)
              );
              if (itemInfo) {
                itemInfo.size = item;
                itemInfo.quantity = cartItems[items][item];
                orderItems.push(itemInfo);
              }
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: buyNowProduct
          ? buyNowProduct.price * buyNowProduct.quantity + delivery_fee
          : getCartAmount() + delivery_fee,
      };

      // api calls for cash on delivery method
      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            setBuyNowProduct(null); // Clear the "Buy Now" product
            setButtonState("success"); // Set success state
            // Wait for 3 seconds and then redirect
            setTimeout(() => {
              setButtonState("default");
              navigate("/collection");
            }, 5000);
          } else {
            toast.error(response.data.message);
            setButtonState("default"); // Reset state
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setButtonState("default"); // Reset state
    }
  };
  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      >
        {/* left side */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First name"
              className="border border-gray-300 rounded-md py-1.5 px-3.5 w-full outline-none "
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last name"
              className="border border-gray-300 rounded-md py-1.5 px-3.5 w-full outline-none"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-md py-1.5 px-3.5 w-full outline-none"
          />
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            type="text"
            placeholder="Street Address"
            className="border border-gray-300 rounded-md py-1.5 px-3.5 w-full outline-none"
          />
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className="border border-gray-300 rounded-md py-1.5 px-3.5 w-full outline-none "
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State"
              className="border border-gray-300 rounded-md py-1.5 px-3.5 w-full outline-none"
            />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="number"
              placeholder="ZIP Code"
              className="border border-gray-300 rounded-md py-1.5 px-3.5 w-full outline-none "
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className="border border-gray-300 rounded-md py-1.5 px-3.5 w-full outline-none"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            type="number"
            placeholder="Phone Number"
            className="border border-gray-300 rounded-md py-1.5 px-3.5 w-full outline-none "
          />
        </div>

        {/* right side */}
        <div className="mt-8">
          <div className="min-w-80">
            <CartTotal />
          </div>

          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            {/* payment method system */}

            <div className="flex flex-col gap-3 lg:flex-row">
              {/* bkash payment */}
              <div
                onClick={() => setMethod("bkash")}
                className="flex items-center gap-1 border p-2 px-3 cursor-pointer rounded-md"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "bkash" ? "bg-green-500" : ""
                  }`}
                ></p>
                <img
                  src={assets.bkash}
                  alt="bkash"
                  className="h-8 mx-4 rounded-lg"
                />
              </div>

              {/* rocket payment */}
              <div
                onClick={() => setMethod("rocket")}
                className="flex items-center gap-1 border p-2 px-3 cursor-pointer rounded-md"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "rocket" ? "bg-green-500" : ""
                  }`}
                ></p>
                <img src={assets.rocket} alt="rocket" className="h-8 mx-4" />
              </div>

              {/* nagad payment */}
              <div
                onClick={() => setMethod("nagad")}
                className="flex items-center gap-1 border p-2 px-3 cursor-pointer rounded-md"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "nagad" ? "bg-green-500" : ""
                  }`}
                ></p>
                <img src={assets.nagad} alt="nagad" className="h-8 mx-4" />
              </div>
              {/* cash on delivery payment */}
              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-1 border p-2 px-3 cursor-pointer rounded-md"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-500" : ""
                  }`}
                ></p>
                <img src={assets.cod} alt="cod" className="h-8 mx-4" />
              </div>
            </div>
            <div className="w-full text-left my-8">
              <button
                type="submit"
                disabled={buttonState === "loading"} // Disable button during loading
                className={`px-16 py-3 text-sm uppercase rounded-md transition-colors duration-300 ease-in-out ${
                  buttonState === "default"
                    ? "bg-black text-white"
                    : buttonState === "loading"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-500 text-white"
                }`}
              >
                {buttonState === "default"
                  ? "Place Order"
                  : buttonState === "loading"
                  ? "Please Wait..."
                  : "Order Successful"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
