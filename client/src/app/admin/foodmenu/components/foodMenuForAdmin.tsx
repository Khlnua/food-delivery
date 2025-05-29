"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pen } from "lucide-react";

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

const FoodMenuForAdmin = () => {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [categoryName, setCategoryName] = useState("");
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

  console.log(menuData);

  return (
    <div className="flex flex-col gap-6">
      {menuData.map((category) => (
        <div
          key={category._id}
          className="flex flex-col gap-4 p-6 bg-[#FFFFFF] border rounded-xl w-300"
        >
          <div>
            <p className="font-semibold text-[20px]">
              {category.categoryName} <span>({category.foods.length})</span>
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <div
                  className="border rounded-md border-dashed
        border-[#EF4444] flex gap-8 flex-col justify-center items-center h-[274px]"
                >
                  <Button className="border rounded-full bg-[#EF4444] text-white px-4">
                    +
                  </Button>
                  <p>Add new Dish to {category.categoryName}</p>
                </div>
              </DialogTrigger>
              <DialogContent className="flex flex-col gap-10">
                <DialogHeader>
                  <DialogTitle>
                    Add new dish to {category.categoryName}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-5">
                    <Label>Food name</Label>
                    <Input
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="Type food name..."
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <Label>Food price</Label>
                    <Input
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="Enter price..."
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <Label>Ingredients</Label>
                  <Input
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="List ingredients..."
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <Label>Food image</Label>
                  <Input
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Choose a file or drag & drop it here"
                  />
                </div>

                <DialogFooter>
                  <Button disabled={!categoryName.trim() || adding}>
                    {adding ? "Adding..." : "Add Dish"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {category.foods.map((food) => (
              <div
                key={food._id}
                className="flex flex-col gap-5 p-4 border rounded-md border-[#E4E4E7]"
              >
                <div className="h-32 rounded-md relative">
                  <img
                    className="rounded-md w-[238.75px] h-[129px]"
                    src={food.image}
                    alt={food.foodName}
                  />
                  <Button
                    key={food._id}
                    className="bg-white rounded-full absolute z-2 w-11 h-11 top-18 left-46"
                  >
                    <Pen className="text-[#EF4444]" />
                  </Button>
                </div>
                <div className="w-[238.75px]">
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

export default FoodMenuForAdmin;
