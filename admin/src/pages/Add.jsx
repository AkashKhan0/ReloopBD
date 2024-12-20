import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // images state
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // product state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [size, setSize] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("size", JSON.stringify(size));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSize([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-start w-full gap-3"
      >
        <div className="">
          <p className="mb-2 capitalize">upload image</p>
          <div className="flex gap-2">
            {/* image1 upload area */}
            <label htmlFor="image1">
              <img
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt="upload_area"
                className="w-20"
              />
              <input
                type="file"
                id="image1"
                hidden
                onChange={(e) => setImage1(e.target.files[0])}
              />
            </label>
            {/* image2 upload area */}
            <label htmlFor="image2">
              <img
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt="upload_area"
                className="w-20"
              />
              <input
                type="file"
                id="image2"
                hidden
                onChange={(e) => setImage2(e.target.files[0])}
              />
            </label>
            {/* image3 upload area */}
            <label htmlFor="image3">
              <img
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt="upload_area"
                className="w-20"
              />
              <input
                type="file"
                id="image3"
                hidden
                onChange={(e) => setImage3(e.target.files[0])}
              />
            </label>
            {/* image4 upload area */}
            <label htmlFor="image4">
              <img
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt="upload_area"
                className="w-20"
              />
              <input
                type="file"
                id="image4"
                hidden
                onChange={(e) => setImage4(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        {/* product information */}
        {/*  */}
        {/* product name */}
        <div className="w-full">
          <p className="capitalize mb-2">product name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Product name"
            required
            className="w-full max-w-[500px] px-3 py-2 capitalize"
          />
        </div>
        {/* product description */}
        <div className="w-full">
          <p className="capitalize mb-2">product description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Product description"
            required
            className="w-full max-w-[500px] px-3 py-2"
          />
        </div>

        {/* adding product category, subcategory */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div className="pl-2.5">
            <p className="capitalize mb-2">product category</p>
            <select
              className="w-full px-3 py-2"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Tech">Tech</option>
            </select>
          </div>
          {/* sub category */}
          <div className="pl-2.5">
            <p className="capitalize mb-2">product sub-category</p>
            <select
              className="w-full px-3 py-2"
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          <div className="pl-2.5">
            <p className="capitalize mb-2">product price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="Number"
              placeholder="999 tk"
              className="w-full px-3 py-2 sm:w-[120px]"
            />
          </div>
        </div>

        {/* product sizes */}
        <div className="">
          <p className="capitalize mb-2">product sizes</p>
          <div className="flex gap-3">
            <div
              className="uppercase"
              onClick={() =>
                setSize((prev) =>
                  prev.includes("s")
                    ? prev.filter((item) => item !== "s")
                    : [...prev, "s"]
                )
              }
            >
              <p
                className={` ${
                  size.includes("s") ? "bg-pink-300" : "bg-slate-200"
                } uppercase px-3 py-1 cursor-pointer`}
              >
                s
              </p>
            </div>
            <div
              className="uppercase"
              onClick={() =>
                setSize((prev) =>
                  prev.includes("m")
                    ? prev.filter((item) => item !== "m")
                    : [...prev, "m"]
                )
              }
            >
              <p
                className={` ${
                  size.includes("m") ? "bg-pink-300" : "bg-slate-200"
                } uppercase px-3 py-1 cursor-pointer`}
              >
                m
              </p>
            </div>
            <div
              className="uppercase"
              onClick={() =>
                setSize((prev) =>
                  prev.includes("l")
                    ? prev.filter((item) => item !== "l")
                    : [...prev, "l"]
                )
              }
            >
              <p
                className={` ${
                  size.includes("l") ? "bg-pink-300" : "bg-slate-200"
                } uppercase px-3 py-1 cursor-pointer`}
              >
                l
              </p>
            </div>
            <div
              className="uppercase"
              onClick={() =>
                setSize((prev) =>
                  prev.includes("xl")
                    ? prev.filter((item) => item !== "xl")
                    : [...prev, "xl"]
                )
              }
            >
              <p
                className={` ${
                  size.includes("xl") ? "bg-pink-300" : "bg-slate-200"
                } uppercase px-3 py-1 cursor-pointer`}
              >
                xl
              </p>
            </div>
            <div
              className="uppercase"
              onClick={() =>
                setSize((prev) =>
                  prev.includes("xxl")
                    ? prev.filter((item) => item !== "xxl")
                    : [...prev, "xxl"]
                )
              }
            >
              <p
                className={` ${
                  size.includes("xxl") ? "bg-pink-300" : "bg-slate-200"
                } uppercase px-3 py-1 cursor-pointer`}
              >
                xxl
              </p>
            </div>
          </div>
        </div>

        {/* add to best seller */}
        <div className="flex gap-2 mt-2">
          <input
            type="checkbox"
            id="bestseller"
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
          />
          <label className="cursor-pointer capitalize" htmlFor="bestseller">
            add to bestseller
          </label>
        </div>
        <button
          type="submit"
          className="w-28 py-3 mt-4 bg-black text-white rounded-md uppercase"
        >
          add
        </button>
      </form>
    </>
  );
};

export default Add;
