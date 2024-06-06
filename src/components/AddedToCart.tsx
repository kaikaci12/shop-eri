import React from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";

import { singleProduct } from "../pages/HomePage";

type Props = {
  setAddedCart: Function;
  singleProduct: singleProduct;
};
export default function AddedToCart({ setAddedCart, singleProduct }: Props) {
  return (
    <div className="absolute bg-pink-400 max-w-[1000px] h-[400px] text-white text-3xl flex-col font-bold flex  gap-[16px]">
      <CgClose onClick={() => setAddedCart(false)} />

      <div className="flex w-full items-center">
        პროდუქტი წარმატებით დაემატა კალათაშიშ
        <RiCheckboxCircleFill size={100} />
      </div>

      <div className="flex">
        <img src={singleProduct.image} alt="product-image" className="w-full" />
        <h2 className="">{singleProduct.name}</h2>
      </div>
      <div className=" flex justify-between mt-auto">
        <button className="bg-red-500  w-fit p-5 h-fit text-xl">
          კალათაში
        </button>
        <button className="bg-gray-400 w-fit  p-5 text-xl">
          შეკვეთის გაფორმება
        </button>
      </div>
    </div>
  );
}
