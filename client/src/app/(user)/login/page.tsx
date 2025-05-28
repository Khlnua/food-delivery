"use client";
import * as Yup from "yup";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "@/utils/EmailController";
import { Formik, Field, Form, ErrorMessage } from "formik";

const LogInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { push } = useRouter();

  const emailValidation = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(emailValidation(value));
  };

  return (
    <div className="w-104 flex flex-col gap-6 ">
      <Button className="border border-[#E4E4E7] rounded-md w-9 h-9 bg-white text-black">
        <ChevronLeft size={36} />
      </Button>

      <p className="font-semibold text-24px">Log in </p>
      <p className="font-normal text-[16px] text-[#71717A]">
        Log in to enjoy your favorite dishes.
      </p>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LogInSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await signIn(values);
            if (response.newtokenForSignin) {
              localStorage.setItem("token", response.newtokenForSignin);
            }
            push("/");
          } catch (error: any) {
            setErrors({
              email: error.response?.data?.message || "Signup failed",
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-6">
            <div>
              <Field
                as="input"
                className="border rounded-md px-3 py-2 w-104"
                name="email"
                placeholder="Enter your email address"
                type="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                as={Input}
                name="password"
                type="password"
                placeholder="Enter your password"
                className="border rounded-md px-3 py-2 w-104"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <a href="http://localhost:3000/reset-password">Forgot password ?</a>

            <Button
              className="h-9 px-8 bg-[#18181B] hover:opacity-25"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Let's Go"}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex gap-3 justify-center">
        <p>Don't have an account?</p>
        <a href="http://localhost:3000/signup" className="text-blue-600">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default UserLogin;
