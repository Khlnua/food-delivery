import { Router } from "express";
import {
  AllCategories,
  CategoryCreateController,
  DeleteFoodCategory,
  UpdateFoodCategory,
} from "../controllers";

export const CategoryRouter = Router();

CategoryRouter.route("/").post(CategoryCreateController).get(AllCategories);

CategoryRouter.route("/:foodCategoryId")
  .patch(UpdateFoodCategory)
  .delete(DeleteFoodCategory);
