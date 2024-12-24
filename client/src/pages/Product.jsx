import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const location = useLocation();
  const { productId } = useParams();
  const { products, currency, addToCart, buyNow } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, [productId, location]);

  return productData ? (
    <>
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        {/* product data */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/* product image */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
              {productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  alt="product_image"
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer "
                />
              ))}
            </div>
            {/* product main images */}
            <div className="w-full sm:w-[80%]">
              <img src={image} alt="main_image" className="w-full h-auto" />
            </div>
          </div>
          {/* product information */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2 capitalize">
              {productData.name}
            </h1>
            <div className="flex items-center gap-1 mt-2 ">
              <img src={assets.star} alt="star" className="w-3 5" />
              <img src={assets.star} alt="star" className="w-3 5" />
              <img src={assets.star} alt="star" className="w-3 5" />
              <img src={assets.star} alt="star" className="w-3 5" />
              <img src={assets.null_star} alt="star" className="w-3 5" />
              <p className="pl-2">(59)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">
              {currency} {productData.price}
            </p>
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productData.description}
            </p>
            <div className="flex flex-col gap-4 my-8">
              <p className="capitalize">select size</p>
              <div className="flex gap-2">
                {productData.size.map((item, index) => (
                  <button
                    className={`border px-4 py-2 bg-gray-100 uppercase ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    key={index}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 uppercase rounded-xl"
            >
              add to cart
            </button>
            {/* Buy now button */}
            <button
              onClick={() => buyNow(productData._id, size)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 uppercase rounded-xl ml-5"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* description and review section */}
        <div className="mt-20">
          <div className="flex mb-1 gap-1">
            <b className="border px-5 py-3 text-sm cursor-pointer">
              Description
            </b>
            <p className="border px-5 py-3 text-sm cursor-pointer">
              Reviews (59)
            </p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>{productData.description}</p>
          </div>
        </div>
        {/* related products */}
        <RelatedProduct
          category={productData.category}
          subcategory={productData.subcategory}
        />
      </div>
    </>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
