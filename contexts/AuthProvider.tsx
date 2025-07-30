import { IAuthProvider } from "@/types/types";
import { createAuthClient } from "better-auth/react";
import React, { createContext, ReactNode } from "react";
const { useSession } = createAuthClient();

const AuthContext = createContext<IAuthProvider | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useSession();
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
