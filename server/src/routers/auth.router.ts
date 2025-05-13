import { Router } from "express";
import { SignUpController } from "../controllers";

export const authRouter = Router();

authRouter.post("/sign-up", SignUpController);
