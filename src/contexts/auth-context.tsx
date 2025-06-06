// src/context/auth-context.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { authApi, authedApi } from "../lib/api";

export interface UserType {
  id: string;
  username: string;
}

interface AuthContextType {
  accessToken: string | null;
  userInfo: UserType | null;
  loginAuth: (accessToken: string) => void;
  setUser: (userInfo: UserType) => void;
  logoutAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  const loginAuth = (token: string) => setAccessToken(token);
  const setUser = (user: UserType) => setUserInfo(user);
  const logoutAuth = () => {
    setAccessToken(null);
    setUserInfo(null);
  };

  useEffect(() => {
    if (!accessToken) return;

    const fetchUser = async () => {
      try {
        const res = await authedApi(accessToken).get("/user");

        const user = res.data.user;
        setUserInfo(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) return;

    const refreshAccess = async () => {
      try {
        const res = await authApi.get("/refresh");
        const access = res.data.access;

        console.log(res.status, res.data);
        setAccessToken(access);
      } catch (error) {
        console.log(error);
      }
    };

    refreshAccess();
  }, []);

  const value: AuthContextType = {
    accessToken,
    userInfo,
    loginAuth,
    setUser,
    logoutAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
