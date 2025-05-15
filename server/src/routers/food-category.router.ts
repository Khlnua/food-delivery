import { Router } from "express";
import { CategoryCreateController } from "../controllers";

export const CategoryRouter = Router();

CategoryRouter.post("/", CategoryCreateController);
