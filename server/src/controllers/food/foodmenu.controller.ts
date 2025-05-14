import { Request, Response } from "express";
import { FoodModel } from "../../models";

type UserBody = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

export const FoodMenuController = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients } = req.body as UserBody;

    if (!foodName || !price || !image || !ingredients) {
      return res.status(400).send({ message: "Provide all details!" });
    }

    const newFood = await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
    });

    res.status(201).send({ message: "Success" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add food item",
    });
  }
};
