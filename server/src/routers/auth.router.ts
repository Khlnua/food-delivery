import { Router } from "express";
import {
  SignInController,
  SignUpController,
  VerifyUserController,
} from "../controllers";

export const authRouter = Router();

authRouter.post("/sign-up", SignUpController);
authRouter.post("/sign-in", SignInController);
authRouter.get("/verify-user", VerifyUserController);
