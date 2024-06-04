import React from "react";
import { orderContext } from "../App";
import { useContext } from "react";
import { IOrders } from "../App";
type TProps = {
  orders: IOrders[];
};
export default function Orders({ orders }: TProps) {
  console.log(orders);
  const totalPrice = orders.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  return (
    <div className="fixed h-full w-full bg-[wheat]  mt-[50px] rounded-[6px]  text-white">
      <div>
        <div className=" rounded-[8px] bg-[#FFF]      px-[28px] py-[31px] z-[99] top-[100px] flex flex-col gap-[30px] opacity-100">
          <div className="flex w-full justify-between">
            <h2 className="text-[#000] text-[18px] font-bold tracking-[1.286px] uppercase">
              Cart({orders.length})
            </h2>

            <button
              onClick={() => handleRemoveAll()}
              className="text-[#000] text-[15px] font-normal leading-[25px] opacity-50 underline cursor-pointer h-[2px]"
            >
              Remove all
            </button>
          </div>
          <div className="flex flex-col gap-[24px] w-full items-center justify-center ">
            {orders.map((item, index) => {
              return (
                <div key={index} className="w-full">
                  {item.quantity >= 1 && orders.length >= 1 && (
                    <div className="h-[64px] flex gap-[20px] items-center justify-between">
                      <img
                        src={item.image}
                        alt="cartitem"
                        className="w-[64px] h-[64px] rounded-[8px] bg-[#F1F1F1]"
                      />
                      <div className="flex flex-col gap-[0px]">
                        <span className="text-[#000] text-[15px] font-bold leading-[25px] inline-flex">
                          {item.name}
                        </span>
                        <span className="text-[#000] text-[14px] font-bold leading-[25px] inline-flex opacity-50">
                          {`$${item.price * item.quantity}`}
                        </span>
                      </div>
                      <div className="flex  h-[32px] bg-[#F1F1F1] items-center  text-[#000] text-center text-[13px] font-bold tracking-[1px] justify-between px-[11.5px] gap-[12px]">
                        <button
                          onClick={() => handleRemoveProduct(item)}
                          className="text-[#000] text-center text-[13px] font-bold tracking-[1px] uppercase opacity-25 cursor-pointer"
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          onClick={() => handleAddProduct(item)}
                          className="text-[#000] text-center text-[13px] font-bold tracking-[1px] uppercase opacity-25 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {orders.length === 0 && (
              <h3 className="text-black font-bold text-[30px] uppercase">
                no Items Added
              </h3>
            )}
          </div>
          <div className="w-full flex justify-between">
            <span className="text-[#000] font-[Manrope] text-[15px] font-normal leading-[25px] uppercase opacity-50">
              total
            </span>
            <span className="text-[#000] text-center text-[18px] font-bold uppercase">
              {`$${totalPrice}`}
            </span>
          </div>

          <button className="text-[#FFF] text-center text-[13px] font-bold leading-[normal] tracking-[1px] uppercase w-full px-[52px] py-[15px] h-[48px] bg-[#D87D4A] cursor-pointer">
            checkout
          </button>
        </div>
      </div>
    </div>
  );
}
