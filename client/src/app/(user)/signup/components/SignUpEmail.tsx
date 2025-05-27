"use client";
import { Button } from "@/components/ui/button";
import { Formik, Field, Form } from "formik";
import { ChevronLeft } from "lucide-react";
import * as Yup from "yup";

export const SignUpEmail = () => (
  <div className="w-104 flex flex-col gap-6 ">
    <Button className="border border-[#E4E4E7] rounded-md w-9 h-9 bg-white text-black">
      <ChevronLeft size={36} />
    </Button>

    <p className="font-semibold text-24px">Create your account</p>
    <p className="font-normal text-[16px] text-[#71717A]">
      Sign up to explore your favorite dishes.
    </p>

    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required(),
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
            name="email"
            placeholder="Enter your email address"
            type="email"
          />

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
export default SignUpEmail;
