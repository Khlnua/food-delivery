"use client";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";
import { ChevronLeft } from "lucide-react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { requestPasswordReset } from "@/utils/EmailController";
import { AxiosError } from "axios"; 

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const AccountVerifyForReset = () => {
  const { push } = useRouter();

  return (
    <div className="w-104 flex flex-col gap-6 ">
      <Button className="border border-[#E4E4E7] rounded-md w-9 h-9 bg-white text-black">
        <ChevronLeft size={36} />
      </Button>

      <p className="font-semibold text-24px"> Please verify Your Email </p>
      <p className="font-normal text-[16px] text-[#71717A]">
        We just sent an email to your email address. Click the link in the email to verify your account.
      </p>

      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await requestPasswordReset(values.email);
            push("/");
          } catch (error) {
            const err = error as AxiosError; 
            setErrors({
              email: (err.response?.data as { message?: string })?.message || "An error occurred while verifying email", // Improved fallback message
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Button
            className="h-9 px-8 bg-[#18181B] hover:opacity-25"
            type="submit"
            disabled={isSubmitting}
            onClick={() => push("/new-password")}
          >
            {isSubmitting ? "..." : "Resend link"}
          </Button>
        )}
      </Formik>
    </div>
  );
};

export default AccountVerifyForReset;
