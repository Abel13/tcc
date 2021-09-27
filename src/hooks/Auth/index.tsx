import React, { createContext, useCallback, useContext, useState } from "react";
import { User } from "../../models/user";
import api from "../../services/api";
import { AuthContextData, AuthenticatedUser, AuthState } from "./interfaces";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@SheepFinance:token");
    const user = localStorage.getItem("@SheepFinance:user");

    if (token && user) {
      return { token, user: JSON.parse(user), loading: false };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(async () => {
    localStorage.removeItem("@SheepFinance:token");
    localStorage.removeItem("@SheepFinance:user");

    setData({ token: "", user: {} } as AuthState);
  }, []);

  const updateUser = useCallback(async (userData: User) => {
    setData({ ...data, loading: true });
    localStorage.setItem("@SheepFinance:user", JSON.stringify(userData));

    setData({ ...data, user: userData, loading: false });
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setData({ token: "", user: {} as User, loading: true });
    console.log("Signing in...");
    const response = await api.post<AuthenticatedUser>("sessions", {
      email,
      password,
    });
    const { token, user } = response.data;

    localStorage.setItem("@SheepFinance:token", token.token);
    localStorage.setItem("@SheepFinance:user", JSON.stringify(user));

    setData({ token: token.token, user, loading: false });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading: data.loading,
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
