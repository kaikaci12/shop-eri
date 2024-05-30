import LoginImg from "/assets/login-img.png";
import ShowPass from "/assets/show.png";
import HidePass from "/assets/hide.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function Register() {
  const [visible, setVisible] = useState<boolean>(false);

  const schema = yup.object({
    name: yup
      .string()
      .required("ველის შევსება აუცილებელია!")
      .min(4, "სახელი უნდა შეიცავდეს მინიმუმ 4 სიმბოლოს")
      .max(30, "არავალიდური სახელი")
      .test("includes space", "არავალიდური სახელი", (value) =>
        value?.includes(" ")
      ),

    phoneNumber: yup
      .string()
      .required("ველის შევსება აუცილებელია!")
      .length(9, "არავალიდური ტელეფონის ნომერი"),
    password: yup
      .string()
      .required("ველის შევსება აუცილებელია!")
      .min(6, "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს"),
    confirmPassword: yup.string().required("ველის შევსება აუცილებელია!"),
  });
  type Inputs = {
    name: string;

    password: string;
    phoneNumber: string;
    confirmPassword: string;
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <div className="lg:flex lg:flex-row ">
      <img src={LoginImg} alt="image" className="lg:w-[50%]" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px] mt-[24px] bf-white p-[48px] lg:w-[50%]"
      >
        <h1 className="text-[#1A1A1A] mb-[20px] text-center text-[30px] font-semibold leading-[28px]">
          რეგისტრაცია
        </h1>
        <label className="text-[#333] text-[1rem] font-normal leading-[12px] tracking-[0.3px] flex flex-col gap-[16px]">
          სახელი
          <input
            type="text"
            {...register("name")}
            placeholder="შეიყვანეთ სახელი"
            className={`rounded-[6px] text-[15px]  font-normal leading-[20px] border-[0.5px]  p-[16px] flex items-center opacity-75 justify-between ${
              errors.name ? " outline-[red]" : " border-[#E5E5E5]"
            }  bg-[#F2F2F2]`}
          />
          {errors.name && (
            <span className="text-red-500 text-[1rem] font-bold">
              {errors.name.message}
            </span>
          )}
        </label>

        <label className="text-[#333] text-[1rem] font-normal leading-[12px] tracking-[0.3px] flex flex-col gap-[16px]">
          ტელეფონის ნომერი
          <input
            {...register("phoneNumber")}
            type="number"
            placeholder="შეიყვანეთ ტელეფონის ნომერი"
            className={`rounded-[6px] text-[15px]  font-normal leading-[20px] border-[0.5px]  p-[16px] flex items-center opacity-75 justify-between ${
              errors.phoneNumber
                ? " outline-[red] border-[red]"
                : " border-[#E5E5E5]"
            }  bg-[#F2F2F2]`}
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
              className={`rounded-[6px] text-[15px]  w-full font-normal leading-[20px] border-[0.5px]  p-[16px] flex items-center opacity-75 justify-between ${
                errors.password
                  ? " outline-[red] border-[red]"
                  : " border-[#E5E5E5]"
              }  bg-[#F2F2F2]`}
            />

            <div
              onClick={(e) => {
                e.preventDefault();
                setVisible(!visible);
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
        <label className="text-[#333] text-[1rem] font-normal leading-[12px] tracking-[0.3px] flex flex-col gap-[16px]">
          დაადასტურე პაროლი
          <div className="flex items-center justify-end  ">
            <input
              {...register("confirmPassword")}
              type={visible ? "text" : "password"}
              placeholder="დაადასტურეთ პაროლი"
              className={`rounded-[6px] text-[15px]  w-full font-normal leading-[20px] border-[0.5px]  p-[16px] flex items-center opacity-75 justify-between ${
                errors.confirmPassword
                  ? " outline-[red] border-[red]"
                  : " border-[#E5E5E5]"
              }  bg-[#F2F2F2]`}
            />

            <div
              onClick={(e) => {
                e.preventDefault();
                setVisible(!visible);
              }}
              className="w-[16px] absolute right-[60px] cursor-pointer"
            >
              <img src={visible ? ShowPass : HidePass} alt="" />
            </div>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-[1rem] font-bold">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <button className="mt-[25px] text-[#FFF] text-center text-[15px] font-bold leading-[20px] tracking-[0.3px] flex px-[24px] py-[10px] justify-center items-center self-stretch rounded-[6px] bg-[var(--system-blue-007-aff,_#007AFF)]">
          რეგისტრაცია
        </button>
        <h2 className="text-center">გაქვს უკვე ანგარიში?</h2>
        <Link to={"/login"} className="text-center font-bold text-blue-400">
          <h2>ავტორიზაცია</h2>
        </Link>
      </form>
    </div>
  );
}
