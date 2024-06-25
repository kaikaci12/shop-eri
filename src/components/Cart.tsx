import React, { useContext, useState } from "react";
import { orderContext } from "../App";
import { IOrders } from "../types";
import { ImBin } from "react-icons/im";
import { Link } from "react-router-dom";

type TProps = {
  handleRemoveProduct: Function;
  handleRemoveAll: Function;
  handleAddProduct: Function;
  handleDeleteOrder: Function;
};
export default function Cart({
  handleRemoveProduct,
  handleAddProduct,
  handleRemoveAll,
  handleDeleteOrder,
}: TProps) {
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const orders = useContext(orderContext);
  console.log(orders);
  const totalPrice = orders.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  return (
    <div className="fixed h-full w-full bg-[wheat]  mt-[50px] rounded-[6px]  text-white">
      {orders.length > 0 ? (
        <div>
          <div className=" rounded-[8px]      px-[28px] py-[31px] z-[99] top-[100px] flex flex-col gap-[30px] opacity-100">
            <div className="flex w-full justify-between">
              <h2 className="text-[#000] text-[18px] font-bold tracking-[1.286px] uppercase">
                თქვენ გაქვთ {orders.length} შეკვეთა
              </h2>

              <button
                onClick={() => handleRemoveAll()}
                className="text-[#000] text-[15px] font-normal leading-[25px] opacity-50 underline cursor-pointer h-[2px]"
              >
                შეკვეთების გასუფთავება
              </button>
            </div>
            <div className="flex flex-col gap-[24px] w-full items-center justify-center ">
              {orders.map((item, index) => {
                return (
                  <div key={index} className="w-full">
                    {deleteAlert && (
                      <div className="bg-orange-400 z-[999] absolute w-[50%] h-[50%] left-40 right-40 top-[100px] p-4 text-2xl flex flex-col justify-between">
                        დარწმუნებული ხართ რომ გსურთ პროდუქტის წაშლა?
                        <div className="flex justify-between">
                          <button
                            onClick={() => setDeleteAlert(false)}
                            className="bg-[red]"
                          >
                            არა
                          </button>
                          <button
                            onClick={() => {
                              setDeleteAlert(false);
                              handleDeleteOrder(item);
                            }}
                            className="bg-[red]"
                          >
                            დიახ
                          </button>
                        </div>
                      </div>
                    )}
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
                            onClick={() => {
                              if (orders.length > 1) {
                                handleRemoveProduct(item);
                              } else {
                                setDeleteAlert(true);
                              }
                            }}
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
                          <button
                            className="cursor-pointer "
                            onClick={() => {
                              setDeleteAlert(true);
                            }}
                          >
                            <ImBin />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-between">
              <span className="text-[#000] font-[Manrope] text-[15px] font-normal leading-[25px] uppercase opacity-50">
                მოწოდების ღირებულება:0ლ
              </span>
              <span className="text-[#000] font-[Manrope] text-[15px] font-normal leading-[25px] uppercase opacity-50">
                გადასახდელი თანხა:
              </span>
              <span className="text-[#000] text-center text-[18px] font-bold uppercase">
                {`ლ${totalPrice}`}
              </span>
            </div>
            <Link to="/checkout">
              <button className="text-[#FFF] text-center text-[13px] font-bold leading-[normal] tracking-[1px] uppercase w-full px-[52px] py-[15px] h-[48px] bg-[#D87D4A] cursor-pointer">
                შემდეგი
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <h3 className="text-black font-bold text-[30px] uppercase">
          თქვენ შეკვეთები არ გაქვთ
        </h3>
      )}
    </div>
  );
}
