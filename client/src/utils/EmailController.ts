import axios from "axios";

export const signUp = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${process.env.BACKEND_ENDPOINT}/sign-up`, data);
  return res.data;
};

export const signIn = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${process.env.BACKEND_ENDPOINT}/sign-in`, data);
  return res.data;
};

export const verifyUser = async (token: string) => {
  const res = await axios.get(
    `${process.env.BACKEND_ENDPOINT}/verify-user?token=${token}`
  );
  return res.data;
};

export const requestPasswordReset = async (email: string) => {
  const res = await axios.post(
    `${process.env.BACKEND_ENDPOINT}/send-email-for-reset-password`,
    {
      email,
    }
  );
  return res.data;
};

export const verifyResetToken = async (token: string) => {
  const res = await axios.get(
    `${process.env.BACKEND_ENDPOINT}/verify-email?token=${token}`
  );
  return res.data;
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  const res = await axios.post(
    `${process.env.BACKEND_ENDPOINT}/change-password`,
    data
  );
  return res.data;
};
