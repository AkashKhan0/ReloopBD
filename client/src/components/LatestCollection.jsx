import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  return (
    <>
      <div className=" my-10 ">
        <div className=" text-center py-8 text-3xl ">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p className=" w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 ">
            Surely you are gorgeous, we just dress you.
          </p>
        </div>
        {/* rendering latest products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProduct.map((items, index) => (
            <ProductItems
              key={index}
              id={items._id}
              image={items.image}
              name={items.name}
              price={items.price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LatestCollection;
