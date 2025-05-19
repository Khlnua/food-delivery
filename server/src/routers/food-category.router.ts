import { Router } from "express";
import {
  AllCategories,
  CategoryCreateController,
  DeleteFoodCategory,
  UpdateFoodCategory,
} from "../controllers";
import { AuthenticateUser } from "../middlewares";

export const categoryRouter = Router();

categoryRouter
  .route("/")
  .post(AuthenticateUser, CategoryCreateController)
  .get(AllCategories);

categoryRouter
  .route("/:foodCategoryId")
  .patch(UpdateFoodCategory)
  .delete(DeleteFoodCategory);
