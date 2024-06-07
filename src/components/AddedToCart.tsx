import React from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { singleProduct } from "../pages/HomePage";

type Props = {
  setAddedCart: Function;
  singleProduct: singleProduct;
};
export default function AddedToCart({ setAddedCart, singleProduct }: Props) {
  return (
    <div className="fixed h-[100vh] w-full top-0 left-0    overflow-hidden flex bg-opacity-45 bg-black items-center justify-center">
      <div className=" bg-pink-400 max-w-[1000px] h-[400px] p-10 text-white text-3xl flex-col font-bold flex  gap-[16px]">
        <CgClose onClick={() => setAddedCart(false)} />

        <div className="flex w-full items-center text-[green]">
          დამატებულია კალათაში
          <RiCheckboxCircleFill size={100} />
        </div>

        <div className="flex items-center gap-3">
          <img
            src={singleProduct.image}
            alt="product-image"
            className="w-[150px]"
          />
          <h2 className="">{singleProduct.name}</h2>
        </div>
        <div className=" flex justify-between mt-auto">
          <Link to="/cart">
            <button className="bg-red-500  rounded-2xl  w-fit p-5 h-fit text-xl">
              კალათა
            </button>
          </Link>

          <button className="bg-yellow-400 w-fit rounded-2xl  p-5 text-xl">
            შეკვეთის გაფორმება
          </button>
        </div>
      </div>
    </div>
  );
}
