import axios from "axios";

export const signUp = async (data: { email: string; password: string }) => {
  const res = await axios.post(
    `${process.env.BACKEND_ENDPOINT}/auth/sign-up`,
    data
  );
  return res.data;
};

export const signIn = async (data: { email: string; password: string }) => {
  const res = await axios.post(
    `${process.env.BACKEND_ENDPOINT}/auth/sign-in`,
    data
  );
  return res.data;
};

export const verifyUser = async (token: string) => {
  const res = await axios.get(
    `${process.env.BACKEND_ENDPOINT}/auth/verify-user?token=${token}`
  );
  return res.data;
};

export const requestPasswordReset = async (email: string) => {
  const res = await axios.post(
    `${process.env.BACKEND_ENDPOINT}/auth/send-email-for-reset-password`,
    {
      email,
    }
  );
  return res.data;
};

export const verifyResetToken = async (token: string) => {
  const res = await axios.get(
    `${process.env.BACKEND_ENDPOINT}/auth/verify-email?token=${token}`
  );
  return res.data;
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  const res = await axios.post(
    `${process.env.BACKEND_ENDPOINT}/auth/change-password`,
    data
  );
  return res.data;
};
