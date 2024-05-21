"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthUser } from "../_types/types";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { useToast } from "~/components/ui/use-toast";
import { API_URL } from "~/const";
import { UserLoginInput } from "~/schema/user-schema";
import { ApiResponse } from "~/api-response";

type AuthContext = {
  isAuthenticated: boolean;
  currentUser: AuthUser | undefined;
  token: string | undefined;
  login: (data: UserLoginInput) => Promise<void>;
  setUser: (data: UserLoginInput) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  currentUser: undefined,
  token: undefined,
  login: async () => {},
  setUser: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const cookies = useCookies();
  const { toast } = useToast();

  const [currentUser, setCurrentUser] = useState<AuthUser | undefined>(
    undefined,
  );
  const [token, setCurrentToken] = useState<string | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookieUser = cookies.get("AuthUser");
    setCurrentUser(cookieUser && JSON.parse(cookieUser));
    setCurrentToken(cookies.get("Authorization"));
    setIsAuthenticated(!!cookieUser);
  }, []);

  const logout = () => {
    cookies.remove("Authorization");
    cookies.remove("AuthUser");

    setIsAuthenticated(false);
    router.push("/");
  };

  const login = async (data: UserLoginInput) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const json: ApiResponse<{ token: string; payload: AuthUser }> =
      await res.json();

    toast({
      title: json.error ? "Помилка" : "Успіх",
      description: json.error ?? "Вхід...",
    });

    if (json.error) return;

    cookies.set("AuthUser", JSON.stringify(json.data!.payload));
    cookies.set("Authorization", json.data!.token);
    setIsAuthenticated(true);

    if (!json.error) router.push("/");
  };

  const setUser = (data: UserLoginInput) => {
    cookies.set("AuthUser", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, logout, login, setUser, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
