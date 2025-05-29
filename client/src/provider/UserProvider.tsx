"use client";
import axios from "axios";
import React, { createContext, useContext, ReactNode } from "react";

const BASE_URL = "http://localhost:8000/auth";

type SignUpResponse = { success: boolean; message: string };
type SignInResponse = { token: string; user: { email: string; id: string } };
type VerifyUserResponse = { verified: boolean; user: { email: string; id: string } };
type PasswordResetRequestResponse = { success: boolean; message: string };
type VerifyResetTokenResponse = { valid: boolean };
type ResetPasswordResponse = { success: boolean; message: string };

type UserContextType = {
  signUp: (data: { email: string; password: string }) => Promise<SignUpResponse>;
  signIn: (data: { email: string; password: string }) => Promise<SignInResponse>;
  verifyUser: (token: string) => Promise<VerifyUserResponse>;
  requestPasswordReset: (email: string) => Promise<PasswordResetRequestResponse>;
  verifyResetToken: (token: string) => Promise<VerifyResetTokenResponse>;
  resetPassword: (data: { token: string; newPassword: string }) => Promise<ResetPasswordResponse>;
};

const AuthContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const signUp = async (data: { email: string; password: string }): Promise<SignUpResponse> => {
    const res = await axios.post(`${BASE_URL}/sign-up`, data);
    return res.data;
  };

  const signIn = async (data: { email: string; password: string }): Promise<SignInResponse> => {
    const res = await axios.post(`${BASE_URL}/sign-in`, data);
    return res.data;
  };

  const verifyUser = async (token: string): Promise<VerifyUserResponse> => {
    const res = await axios.get(`${BASE_URL}/verify-user?token=${token}`);
    return res.data;
  };

  const requestPasswordReset = async (email: string): Promise<PasswordResetRequestResponse> => {
    const res = await axios.post(`${BASE_URL}/reset-password-request`, {
      email,
    });
    return res.data;
  };

  const verifyResetToken = async (token: string): Promise<VerifyResetTokenResponse> => {
    const res = await axios.get(
      `${BASE_URL}/verify-reset-password-request?token=${token}`
    );
    return res.data;
  };

  const resetPassword = async (data: { token: string; newPassword: string }): Promise<ResetPasswordResponse> => {
    const res = await axios.post(`${BASE_URL}/reset-password`, data);
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        verifyUser,
        requestPasswordReset,
        verifyResetToken,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within UserContextProvider");
  return context;
};
