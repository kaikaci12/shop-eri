import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderContext } from "../App";
import * as yup from "yup";
type Inputs = {
  city: string;
  postCode: number;
  phoneNumber: number;
  address: string;
};

export default function Checkout() {
  const schema = yup.object({
    phoneNumber: yup
      .string()
      .required("ველის შევსება აუცილებელია!")
      .length(9, "არავალიდური ტელეფონის ნომერი"),
    city: yup.string().required("ველის შევსება აუცილებელია!"),
    postCode: yup.number().required(),
    address: yup.string().required(),
  });

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
  const cartItems = useContext(orderContext);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  return (
    <div className="relative flex gap-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full relative   p-5 flex flex-col gap-[20px] sm:gap-[35px] w-full"
      >
        <label className={`text-xl flex gap-[9px]  flex-col text-[gray] `}>
          ქალაქი*
          {errors.city && (
            <span className="text-[red] font-bold text-xl">
              ველის შევსება აუცილებელია
            </span>
          )}
          <input
            {...register("city")}
            type="text"
            className={`rounded-md bg-gray-300 border-[gray] ${
              errors.city && "border-[red] "
            }  p-3`}
          />
        </label>
        <label className="text-xl flex gap-[9px]  flex-col text-[gray]">
          პოსტ კოდი
          {errors.postCode && (
            <span className="text-[red] font-bold text-xl">
              ველის შევსება აუცილებელია
            </span>
          )}
          <input
            {...register("postCode")}
            type="text"
            className={`rounded-md bg-gray-300 border-[gray] ${
              errors.postCode && "outline-[red] "
            }  p-3`}
          />
        </label>
        <label className="text-xl flex gap-[9px]  flex-col text-[gray]">
          მისამართი
          {errors.address && (
            <span className="text-[red] font-bold text-xl">
              ველის შევსება აუცილებელია
            </span>
          )}
          <input
            type="text"
            {...register("address")}
            className={`rounded-md bg-gray-300 border-[gray] ${
              errors.address && "outline-[red] "
            }  p-3`}
          />
        </label>

        <label className="text-xl flex gap-[9px]  flex-col text-[gray]">
          ტელეფონის ნომერი
          {errors.phoneNumber && (
            <span className="text-[red] font-bold text-xl">
              ველის შევსება აუცილებელია
            </span>
          )}
          <input
            type="text"
            className={`rounded-md bg-gray-300 border-[gray] ${
              errors.phoneNumber && "outline-[red] "
            }  p-3`}
          />
        </label>
        <button className="p-3 bg-orange-500 text-xl text-white font-bold">
          შეკვეთის განთავსება ({totalPrice}ლ)
        </button>
      </form>

      <div className="mt-5 max-w-[800px]">
        {cartItems.map((product) => {
          return (
            <div className="flex flex-col gap-3 ">
              <div>
                <img src={product.image} alt="product" className="w-20" />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <span>{product.price}ლ</span>
              </div>
            </div>
          );
        })}
        <div className="w-full flex justify-between flex-col mt-5">
          <h3>{cartItems.length} პროდუქტი</h3>
          <span className="text-[#000] font-[Manrope] text-[15px] font-normal leading-[25px] uppercase opacity-50">
            მოწოდების ღირებულება:0ლ
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[#000] font-[Manrope] text-[15px] font-normal leading-[25px] uppercase opacity-50">
              გადასახდელი თანხა:
            </span>
            <span className="text-[#000] text-center text-[18px] font-bold uppercase">
              {`${totalPrice}ლ`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
