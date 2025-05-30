"use client";

import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import { Pen, Plus } from "lucide-react";
import { FoodFormModal } from "./foodFormModal";
import { Button } from "@/components/ui/button";

type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

type CategoryWithFoods = {
  _id: string;
  categoryName: string;
  foods: Food[];
};

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.allFilteredFoods || []);

export const FoodMenuForAdmin = () => {
  const { data: categories = [], mutate } = useSWR<CategoryWithFoods[]>(
    `${process.env.BACKEND_ENDPOINT}/food-category/`,
    fetcher
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Food | null>(null);
  const [categoryId, setCategoryId] = useState("");

  const handleOpenModal = (food: Food | null, categoryId: string) => {
    setEditData(food);
    setCategoryId(categoryId);
    setModalOpen(true);
  };

  const handleSubmit = async (data: {
    foodName: string;
    price: number;
    ingredients: string;
    image: string;
    category: string;
  }) => {
    // Replaced `any` with specific type
    try {
      const payload = {
        ...data,
        category: [categoryId],
      };
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (editData) {
        await axios.patch(
          `${process.env.BACKEND_ENDPOINT}/food/${editData._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(`${process.env.BACKEND_ENDPOINT}/food`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setModalOpen(false);
      setEditData(null);
      mutate();
    } catch (error) {
      console.error("Submit failed", error);
      alert("Failed to save the dish.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {categories.map((category) => (
        <div
          key={category._id}
          className="flex flex-col w-300 border rounded-xl border-[#E4E4E7] p-6 bg-white gap-4"
        >
          <p className="text-xl font-semibold">
            {category.categoryName} ({category.foods.length})
          </p>

          <div className="grid grid-cols-4 gap-4">
            <div
              onClick={() => handleOpenModal(null, category._id)}
              className="flex flex-col items-center justify-center border-2 border-dashed border-[#EF4444] rounded-xl p-4 h-70 text-center cursor-pointer hover:bg-red-50 transition"
            >
              <Plus className="h-8 w-8 text-[#EF4444]" />
              <p className="text-sm text-gray-500 mt-2">
                Add new Dish to <br />
                <span className="font-semibold text-black">
                  {category.categoryName}
                </span>
              </p>
            </div>

            {category.foods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-xl border shadow hover:shadow-md transition overflow-hidden flex flex-col gap-5 p-4  border-[#E4E4E7]"
              >
                <div className="relative rounded-md h-32">
                  <img
                    className="rounded-md w-[238.75px] h-[132px] object-cover"
                    src={food.image}
                    alt={food.foodName}
                  />
                  <Button
                    className="absolute bottom-2 right-2 p-1 bg-white rounded-full border hover:bg-gray-100 transition"
                    onClick={() => handleOpenModal(food, category._id)}
                  >
                    <Pen className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
                <div className="p-3 w-[239px]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-red-500 truncate">
                      {food.foodName}
                    </p>
                    <p className="text-[12px]">${food.price}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {food.ingredients}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <FoodFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editData || undefined}
        categoryId={categoryId}
      />
    </div>
  );
};
