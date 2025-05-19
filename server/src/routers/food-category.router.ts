import { Router } from "express";
import {
  AllCategories,
  CategoryCreateController,
  DeleteFoodCategory,
  UpdateFoodCategory,
} from "../controllers";

export const categoryRouter = Router();

categoryRouter.route("/").post(CategoryCreateController).get(AllCategories);

categoryRouter
  .route("/:foodCategoryId")
  .patch(UpdateFoodCategory)
  .delete(DeleteFoodCategory);
