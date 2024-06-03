import React from "react";
import { useParams } from "react-router-dom";
import data from "../data.json";
import { Link } from "react-router-dom";
export default function Product() {
  const productParams = useParams();
  const productData = data.find(
    (product) => product.id.toString() === productParams.id
  );
  return (
    <div>
      <Link to={`/`}>
        <button className="bg-orange-500  font-bold px-[10px] text-xl">
          უკან დაბრუნება
        </button>
      </Link>

      <div
        key={productData?.id}
        className="w-[300px] mt-[50px] flex flex-col gap-[16px]"
      >
        <img
          src={productData?.image}
          alt="productData-image"
          className="w-full"
        />
        <div className="flex flex-col gap-[12px]">
          <span className="text-orange-400 text-[2rem] font-bold">
            {productData?.price}ლ
          </span>
          <h2 className="">{productData?.name}</h2>
          <p>{productData?.description}</p>
        </div>

        <button className="bg-orange-400 w-[50%] h-[50px] px-[16px] flex items-center text-white font-bold text-xl">
          შეკვეთა
        </button>
      </div>
    </div>
  );
}
