import LoginImg from "/assets/login-img.png";
import ShowPass from "/assets/show.png";
import HidePass from "/assets/hide.png";
import { InputMask } from "@react-input/mask";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function Login() {
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
    <div className="lg:flex lg:flex-row">
      <img src={LoginImg} alt="image" className="lg:w-[50%]" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px] mt-[24px] bf-white p-[48px] lg:w-[50%]"
      >
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
              placeholder="შეიყვანეთ ტელეფონის ნომერი"
              className="rounded-[6px] w-full text-[15px]   font-normal p-[16px] leading-[20px] border-[0.5px]   flex items-center opacity-75 justify-between border-[#E5E5E5] bg-[#F2F2F2]"
            />
            <div
              onClick={(e) => {
                setVisible(!visible);
                e.preventDefault();
              }}
              className="w-[16px] absolute right-[60px] cursor-pointer"
            >
              <img src={visible ? ShowPass : HidePass} alt="" />
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
        <Link to={"/register"} className="text-center font-bold text-blue-400">
          <h2>რეგისტრაცია</h2>
        </Link>
      </form>
    </div>
  );
}
