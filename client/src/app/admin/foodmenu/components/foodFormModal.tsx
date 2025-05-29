"use client";

import axios from "axios";
import { GetFoodImage } from "./FoodImageUpload"; 
import { Trash, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FoodFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { foodName: string; price: number; ingredients: string; image: string; category: string }) => void; 
  initialData?: { _id:string, foodName: string; price: number; ingredients: string; image: string } | null; 
  categoryId: string;
};

type FoodId = {
  _id: string;
};

export const FoodFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categoryId,
}: FoodFormProps) => {
  const [form, setForm] = useState({
    _id: "",
    foodName: "",
    price: "",
    ingredients: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        _id: initialData._id || "",
        foodName: initialData.foodName || "",
        price: initialData.price?.toString() || "",
        ingredients: initialData.ingredients || "",
        image: initialData.image || "",
      });
    } else {
      setForm({
        _id: "",
        foodName: "",
        price: "",
        ingredients: "",
        image: "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    const formatted = {
      ...form,
      price: parseFloat(form.price),
      category: categoryId,
    };
    onSubmit(formatted); 
    setForm({
      _id: "",
      foodName: "",
      price: "",
      ingredients: "",
      image: "",
    });
    onClose();
  };

  const handleDelete = async (data: FoodId) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!data._id) return;

      await axios.delete(`http://localhost:8000/food-category/${categoryId}/food/${data._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onClose();
      alert("Dish deleted successfully.");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete the dish.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[500px] max-w-full p-6 relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Dish" : "Add New Dish"}
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-3 w-1/2">
              <Label className="text-sm font-medium">Food name</Label>
              <Input
                name="foodName"
                value={form.foodName}
                onChange={handleChange}
                placeholder="Type food name..."
              />
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <Label className="text-sm font-medium">Price</Label>
              <Input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label className="text-sm font-medium">Ingredients</Label>
            <Input
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              placeholder="List ingredients..."
              className="py-8"
            />
          </div>

          <GetFoodImage onUpload={(url) => setForm((prev) => ({ ...prev, image: url }))} />

      
        </div>

        <div className="mt-6 flex justify-between items-center">
          {initialData && (
            <Button
              className="text-red-500 flex items-center gap-1 text-sm bg-transparent border hover:bg-gray-300"
              onClick={() => handleDelete(initialData)}
            >
              <Trash className="w-4 h-4" />
              Delete
            </Button>
          )}
          <Button onClick={handleSave}>
            {initialData ? "Save Changes" : "Add Dish"}
          </Button>
        </div>
      </div>
    </div>
  );
};
