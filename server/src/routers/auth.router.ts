import { Router } from "express";
import {
  SignInController,
  SignUpController,
  VerifyUserController,
  SendEmailForResetPasswordController,
} from "../controllers";
import { VerifyResetPasswordRequestController } from "../controllers/auth/verify-reset-password-request.controller";

export const authRouter = Router();

authRouter.post("/sign-up", SignUpController);
authRouter.post("/sign-in", SignInController);
authRouter.get("/verify-user", VerifyUserController);

authRouter.post(
  "/send-email-for-reset-password",
  SendEmailForResetPasswordController
);

authRouter.get("/verify-email", VerifyResetPasswordRequestController);
