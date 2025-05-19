import { Request, Response } from "express";
import { FoodModel } from "../../models";

export const AllFoods = async (req: Request, res: Response) => {
  const foods = await FoodModel.find();

  res.send(200).send({ foods });
};
