import LoginImg from "/assets/login-img.png";
import ShowPass from "/assets/show.png";
import HidePass from "/assets/hide.png";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "/assets/close.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
interface IProps {
  handleLoginWindow: Function;

  handleRegWindow: Function;
}

export default function Login({ handleLoginWindow, handleRegWindow }: IProps) {
  const [visible, setVisible] = useState(false);

  const schema = yup.object({
    phoneNumber: yup
      .string()
      .required("ველის შევსება აუცილებელია!")
      .length(9, "არავალიდური ტელეფონის ნომერი"),
    password: yup
      .string()
      .required("ველის შევსება აუცილებელია!")
      .min(6, "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს"),
  });
  type Inputs = {
    password: string;
    phoneNumber: string;
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const password = watch("password");
  const phoneNumber = watch("phoneNumber");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  console.log(errors);

  return (
    <div
      className="h-[100vh] absolute   w-full   flex flex-col items-center   px-[30px]    bg-opacity-40 bg-black
    "
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px] sm:mt-[30px]  bg-white w-full p-[48px] lg:w-[50%]"
      >
        <div
          onClick={() => handleLoginWindow()}
          className=" w-full flex justify-end  cursor-pointer"
        >
          <img src={CloseIcon} alt="" className="w-[20px] " />
        </div>
        <h1 className="text-[#1A1A1A] mb-[20px] text-center text-[30px] font-semibold leading-[28px]">
          ავტორიზაცია
        </h1>

        <label className="text-[#333] text-[1rem] font-normal leading-[12px] tracking-[0.3px] flex flex-col gap-[16px]">
          ტელეფონის ნომერი
          <input
            {...register("phoneNumber")}
            type="number"
            placeholder="შეიყვანეთ ტელეფონის ნომერი"
            className="rounded-[6px] text-[15px] font-normal leading-[20px] border-[0.5px]  p-[16px] flex items-center opacity-75 justify-between border-[#E5E5E5] bg-[#F2F2F2]"
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-[1rem] font-bold">
              {errors.phoneNumber.message}
            </span>
          )}
        </label>
        <label className="text-[#333] text-[1rem] font-normal leading-[12px] tracking-[0.3px] flex flex-col gap-[16px]">
          პაროლი
          <div className="flex items-center justify-end  ">
            <input
              {...register("password")}
              type={visible ? "text" : "password"}
              placeholder="შეიყვანეთ პაროლი"
              className="rounded-[6px] w-full text-[15px]   font-normal p-[16px] leading-[20px] border-[0.5px]   flex items-center opacity-75 justify-between border-[#E5E5E5] bg-[#F2F2F2]"
            />
            <div className="absolute  lg:w-[700px] px-[16px] flex  justify-end   ">
              <img
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(!visible);
                }}
                src={visible ? ShowPass : HidePass}
                alt=""
                className="w-[16px]"
              />
            </div>
          </div>
          {errors.password && (
            <span className="text-red-500 text-[1rem] font-bold">
              {errors.password.message}
            </span>
          )}
        </label>
        <button className="mt-[25px] text-[#FFF] text-center text-[15px] font-bold leading-[20px] tracking-[0.3px] flex px-[24px] py-[10px] justify-center items-center self-stretch rounded-[6px] bg-[var(--system-blue-007-aff,_#007AFF)]">
          ავტორიზაცია
        </button>
        <h2 className="text-center">არ გაქვს ანგარიში?</h2>
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();

          handleLoginWindow();
          handleRegWindow();
        }}
        className="text-center font-bold text-blue-400"
      >
        <h2 className="w-full">რეგისტრაცია</h2>
      </button>
    </div>
  );
}
