"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Formik, Field, Form } from "formik";
import { ChevronLeft } from "lucide-react";
import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const SignUpPass = () => (
  <div className="w-104 flex flex-col gap-6 ">
    <Button className="border border-[#E4E4E7] rounded-md w-9 h-9 bg-white text-black">
      <ChevronLeft size={36} />
    </Button>

    <p className="font-semibold text-24px">Create a strong password</p>
    <p className="font-normal text-[16px] text-[#71717A]">
      Create a strong password with letters, numbers.
    </p>

    <Formik
      initialValues={{
        passwors: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .matches(passwordRules, {
            message: "Please create a stronger password",
          })
          .required("Required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), undefined], "Passwords must match")
          .required("Required"),
      })}
      onSubmit={(values) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {(formikProps) => (
        <Form className="flex flex-col gap-6">
          <Field
            className="border rounded-md px-3 py-2"
            name="password"
            placeholder="Password"
            type="password"
          />
          <Field
            className="border rounded-md px-3 py-2"
            name="confirm-password"
            placeholder="Confirm"
            type="password"
          />

          <div className="flex items-center gap-2">
            <Checkbox />
            <p className="text-[#71717A] txet-sm">Show password</p>
          </div>

          <Button
            className="border rounded-md px-8 py-0.5 bg-black text-white"
            type="submit"
          >
            Let's Go
          </Button>
        </Form>
      )}
    </Formik>

    <div className="flex gap-3">
      <p>Already have an account?</p>
      <a href="http://localhost:3000/login" className="text-blue-600">
        Log in
      </a>
    </div>
  </div>
);
export default SignUpPass;
