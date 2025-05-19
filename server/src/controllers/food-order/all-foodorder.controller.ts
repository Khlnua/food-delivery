import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

export const AllFoodOrder = async (req: Request, res: Response) => {
  const orders = await FoodOrderModel.find();

  res.send(200).send({ orders });
};
