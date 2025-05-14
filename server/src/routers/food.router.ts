import { Router } from "express";
import { FoodMenuController } from "../controllers";
export const foodRouter = Router();

foodRouter.get("/menu", FoodMenuController);
