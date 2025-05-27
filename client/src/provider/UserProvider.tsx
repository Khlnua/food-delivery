// "use client";

// import { useRouter } from "next/navigation";
// import {
//   createContext,
//   Dispatch,
//   PropsWithChildren,
//   SetStateAction,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type User = {
//   email: string;
//   password: string;
// };

// type UserContextType = {
//   user: User;
//   loading: Boolean;
//   setUser: Dispatch<SetStateAction<User | undefined>>;
//   signin: (_email: string, _password: string) => Promise<void>;
//   signout: () => void;
// };

// const UserContext = createContext<UserContextType>({} as UserContextType);

// export const UserContextProvider = ({ children }: PropsWithChildren) => {
//   const { push } = useRouter();
//   const [user, setUser] = useState<User>({ email: "", password: "" });
//   const [loading, setLoading] = useState(true);

//   const signin = async (email: string, password: string) => {
//     const data = await handleSignIn({ email, password });
//     if (data?.token) {
//       localStorage.setItem("token", data.token);
//       setUser(data.user);
//       push("/");
//     }
//   };

//   useEffect(() => {
//     const loadUser = async () => {
//       const token = localStorage.getItem("token");
//       const data = await getCurrentUser(token);
//       setUser(data?.user);
//       setLoading(false);
//     };
//     loadUser();
//   });

//   const signout = () => {
//     localStorage.removeItem("token");
//     setUser(undefined);
//   };

//   return (
//     <UserContext.Provider value={{ user, signin, signout, setUser, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => useContext(UserContext);

"use client";

import React, { createContext, useContext, ReactNode } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000/auth";

type AuthContextType = {
  signUp: (data: { email: string; password: string }) => Promise<any>;
  signIn: (data: { email: string; password: string }) => Promise<any>;
  verifyUser: (token: string) => Promise<any>;
  requestPasswordReset: (email: string) => Promise<any>;
  verifyResetToken: (token: string) => Promise<any>;
  resetPassword: (data: { token: string; newPassword: string }) => Promise<any>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const signUp = async (data: { email: string; password: string }) => {
    const res = await axios.post(`${BASE_URL}/sign-up`, data);
    return res.data;
  };

  const signIn = async (data: { email: string; password: string }) => {
    const res = await axios.post(`${BASE_URL}/sign-in`, data);
    return res.data;
  };

  const verifyUser = async (token: string) => {
    const res = await axios.get(`${BASE_URL}/verify-user?token=${token}`);
    return res.data;
  };

  const requestPasswordReset = async (email: string) => {
    const res = await axios.post(`${BASE_URL}/reset-password-request`, {
      email,
    });
    return res.data;
  };

  const verifyResetToken = async (token: string) => {
    const res = await axios.get(
      `${BASE_URL}/verify-reset-password-request?token=${token}`
    );
    return res.data;
  };

  const resetPassword = async (data: {
    token: string;
    newPassword: string;
  }) => {
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
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
