import { Router } from "express";
import {
  FoodMenuController,
  UpdateFoodMenu,
  DeleteFood,
  AllFoods,
} from "../controllers";

export const foodRouter = Router();

foodRouter.route("/").post(FoodMenuController).get(AllFoods);
foodRouter.route("/:foodId").patch(UpdateFoodMenu).delete(DeleteFood);
