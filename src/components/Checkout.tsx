import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  console.log(errors);
  return (
    <div className="relative top-[200px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full relative  w-full p-5 flex flex-col gap-[20px] sm:gap-[35px]"
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
          შეკვეთის განცხადება
        </button>
      </form>
    </div>
  );
}
