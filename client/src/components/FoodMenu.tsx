"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

type FoodCategory = {
  _id: string;
  categoryName: string;
  foods: FoodType[];
};

type FoodType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

type AllFoodCategories = {
  allFilteredFoods: FoodCategory[];
};

export const FoodMenu = () => {
  const [menuData, setMenuData] = useState<FoodCategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<AllFoodCategories>(
          "http://localhost:8000/food-category"
        );
        setMenuData(response.data?.allFilteredFoods || []);
      } catch (error: any) {
        setError(error.message || "Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col pl-20">
      {menuData.map((category) => (
        <div key={category._id} className="flex flex-col gap-4 p-6 w-300">
          <div>
            <p className="font-semibold text-[20px] text-white">
              {category.categoryName} <span>({category.foods.length})</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {category.foods.map((food) => (
              <div
                key={food._id}
                className="flex flex-col gap-5 p-4 border rounded-md border-[#E4E4E7] bg-white"
              >
                <div className="h-32 rounded-md relative">
                  <img
                    className="rounded-md w-full h-[129px] object-cover"
                    src={food.image}
                    alt={food.foodName}
                  />
                  <Button
                    key={food._id}
                    className="bg-white text-red-600 rounded-full absolute z-2 w-11 h-11 right-1 bottom-1"
                  >
                    +
                  </Button>
                </div>
                <div className="w-full">
                  <div className="flex justify-between">
                    <p className="text-[#EF4444] font-medium text-sm">
                      {food.foodName}
                    </p>
                    <p className="text-[12px]">${food.price}</p>
                  </div>
                  <p className="">{food.ingredients}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
