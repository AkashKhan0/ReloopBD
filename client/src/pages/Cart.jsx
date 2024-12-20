import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <>
      <div className="pt-14">
        <div className="text-2xl mb-3">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>
        <div>
          {cartData.length > 0 ? ( // Check if cartData is not empty
            cartData.map((item, index) => {
              const productData = products.find(
                (products) => products._id === item._id
              );

              return (
                <div
                  className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-start gap-4 min-h-screen"
                  key={index}
                >
                  <div className="flex items-start gap-6">
                    <img
                      src={productData.image[0]}
                      alt="product image"
                      className="w-16 sm:w-20"
                    />
                    <div>
                      <p className="text-xs sm:text-lg font-medium">
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {currency} {productData.price}
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 uppercase">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                  />
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    src={assets.del}
                    alt="delete"
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                  />

                  <div className="flex justify-start my-10">
                    <div className="w-full sm:w-[450px]">
                      <CartTotal />
                      <div className="w-full text-start">
                        <button
                          onClick={() => navigate("/placeorder")}
                          className="bg-black text-white text-sm my-8 px-8 py-3 rounded-3xl uppercase"
                        >
                          proceed to checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // If cartData is empty, show this block
            <div className="flex flex-col items-center justify-center mt-20">
              <img
                src={assets.empty} // Replace with your empty cart image path
                alt="Empty cart"
                className="w-1/3"
              />
              <p className="text-gray-500 text-lg mt-4">Your cart is empty!</p>
              <button
                onClick={() => navigate("/collection")} // Navigate to homepage or shop
                className="bg-black text-white text-sm mt-6 px-8 py-3 rounded-3xl uppercase mb-10"
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

export default Cart;
