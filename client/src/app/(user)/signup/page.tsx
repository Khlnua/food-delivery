"use client";
import { SignUpEmail, SignUpPass } from "./components";

export const SignUpPage = () => (
  <div className="flex justify-center items-center gap-15 mt-40">
    <div>
      <SignUpEmail />
      <SignUpPass />
    </div>
    <div className="w-1/2  ">
      <img
        className="rounded-lg"
        src="https://learn.g2.com/hubfs/food%20delivery%20tech%20gloss-ai.jpg"
        alt=""
      />
    </div>
  </div>
);
export default SignUpPage;
