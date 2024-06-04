import React from "react";
import { orderContext } from "../App";
import { useContext } from "react";
import { IOrders } from "../App";
type TProps = {
  orders: IOrders[];
};
export default function Orders({ orders }: TProps) {
  console.log(orders);
  return (
    <div className="fixed h-full w-full bg-orange-300 text-[4rem] mt-[50px] rounded-[6px]  text-white">
      {orders.length > 1 && <h1>თქვენ შეკვეთები არ გაქვთ</h1>}
      {orders.map((product) => {
        return <div></div>;
      })}
    </div>
  );
}
