import LoginImg from "/assets/login-img.png";
import ShowPass from "/assets/show.png";
import HidePass from "/assets/hide.png";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="lg:flex lg:flex-row">
      <img src={LoginImg} alt="image" className="lg:w-[50%]" />

      <form className="flex flex-col gap-[20px] mt-[24px] bf-white p-[48px] lg:w-[50%]">
        <h1 className="text-[#1A1A1A] mb-[20px] text-center text-[30px] font-semibold leading-[28px]">
          ავტორიზაცია
        </h1>
        <label className="text-[#333] text-[1rem] font-normal leading-[12px] tracking-[0.3px] flex flex-col gap-[16px]">
          ელფოსტა
          <input
            type="text"
            placeholder="შეიყვანეთ ეფლოსტა"
            className="rounded-[6px] text-[15px] font-normal leading-[20px] border-[0.5px]  p-[16px] flex items-center opacity-75 justify-between border-[#E5E5E5] bg-[#F2F2F2]"
          />
        </label>
        <label className="text-[#333] text-[1rem] font-normal leading-[12px] tracking-[0.3px] flex flex-col gap-[16px]">
          ტელეფონის ნომერი
          <input
            type="text"
            placeholder="შეიყვანეთ ტელეფონის ნომერი"
            className="rounded-[6px] text-[15px] font-normal leading-[20px] border-[0.5px]  p-[16px] flex items-center opacity-75 justify-between border-[#E5E5E5] bg-[#F2F2F2]"
          />
        </label>
        <label className="text-[#333] text-[1rem] font-normal leading-[12px] tracking-[0.3px] flex flex-col gap-[16px]">
          პაროლი
          <div className="flex items-center justify-end  ">
            <input
              type={visible ? "text" : "password"}
              placeholder="შეიყვანეთ ტელეფონის ნომერი"
              className="rounded-[6px] w-full text-[15px]   font-normal p-[16px] leading-[20px] border-[0.5px]   flex items-center opacity-75 justify-between border-[#E5E5E5] bg-[#F2F2F2]"
            />
            <div
              onClick={() => setVisible(!visible)}
              className="w-[16px] absolute right-[60px] cursor-pointer"
            >
              <img src={visible ? ShowPass : HidePass} alt="" />
            </div>
          </div>
        </label>
        <h2 className="text-center">არ გაქვს ანგარიში?</h2>
        <Link to={"/register"} className="text-center font-bold text-blue-400">
          <h2>რეგისტრაცია</h2>
        </Link>
      </form>
    </div>
  );
}
