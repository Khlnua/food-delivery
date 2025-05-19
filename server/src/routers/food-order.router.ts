import { Router } from "express";
import {
  FoodOrderCreateController,
  UpdateFoodOrderController,
  UserFoodOrder,
  AllFoodOrder,
} from "../controllers";

export const foodOrderRouter = Router();

foodOrderRouter.route("/").post(FoodOrderCreateController).get(AllFoodOrder);
foodOrderRouter.patch("/:foodOrderId", UpdateFoodOrderController);
foodOrderRouter.get("/:userId", UserFoodOrder);
