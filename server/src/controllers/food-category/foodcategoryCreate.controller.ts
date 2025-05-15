import { FoodCategoryModel } from "../../models";
import { Request, Response } from "express";

type CategoryBody = {
  catergoryName: string;
};

export const CategoryCreateController = async (req: Request, res: Response) => {
  const { catergoryName } = req.body as CategoryBody;
  if (!catergoryName) {
    res.status(400).send({ message: "Give category name" });
    return;
  }
  // const { _id } =
  const newCategory = await FoodCategoryModel.create({
    catergoryName,
  });

  // await FoodCategoryModel.findByIdAndUpdate({ _id }, {}, { new: true });

  res.status(201).send({ message: "Success", newCategory });
};
