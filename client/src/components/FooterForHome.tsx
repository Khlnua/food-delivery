"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { FacebookIcon, HandPlatter, InstagramIcon } from "lucide-react";

type FoodCategory = {
  _id: string;
  categoryName: string;
};

type AllFoodCategories = {
  allFilteredFoods: FoodCategory[];
};

export const FooterForHome = () => {
  const { push } = useRouter();
  const [data, setData] = useState<FoodCategory[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<AllFoodCategories>(
        `${process.env.BACKEND_ENDPOINT}/food-category`
      );
      setData(response.data?.allFilteredFoods || []);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.message || "Failed to fetch data");
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col pt-25 bg-black h-[755px]">
      <div className="flex bg-red-500 text-white font-semibold py-7 pl-[98px] text-[30px] gap-[34px] overflow-hidden whitespace-nowrap">
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
      </div>
      <div className="flex px-[88px] py-[76px]">
        <div className=" flex h-full w-full justify-between">
          <div className="flex flex-col items-center">
            <HandPlatter
              onClick={() => push("/")}
              className="text-red-500 fill-red-500"
            />

            <p className="text-white text-[20px] font-semibold">
              Nom{" "}
              <span className="text-[#EF4444] text-[20px] font-semibold">
                Nom
              </span>
            </p>
            <p className="text-white text-[12px] font-normal">Swift Delivery</p>
          </div>
          <div className="flex gap-[112px]">
            <div className="flex flex-col gap-4">
              <h1 className="text-[#71717A]">NOMNOM</h1>
              <p className="text-[16px] text-white">Home</p>
              <p className="text-[16px] text-white">Contact Us</p>
              <p className="text-[16px] text-white">Delivery zone</p>
            </div>
            <div className="flex gap-[56px]">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#71717A] text-[16px]">Menu</h1>
                {data?.slice(0, 5).map((category) => (
                  <p
                    key={category._id}
                    className="cursor-pointer hover:underline text-white"
                  >
                    {category.categoryName}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[#71717A] text-[16px]">Menu</h1>
            <div className="flex gap-4">
              <FacebookIcon className="text-white" />
              <InstagramIcon className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <hr className="text-gray-300 px-20" />
      <div className="flex justify-center gap-20 text-[#71717A] text-[14px] px-20 py-5 items-center">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and conditoin</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};
