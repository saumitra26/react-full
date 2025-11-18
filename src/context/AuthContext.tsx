import { createContext, useState, useContext, useEffect } from "react";
import type {
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "../dataModel/auth";
import { authApi } from "../api/authAPi";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  user: AuthUser | null;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => void;
  registerUser: (payload: RegisterRequest) => Promise<void>;
};
type TokenPayload = {
  id: number;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};
type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      //Token expired
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return;
      }
      setUser({
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      });
    } catch (error) {
      localStorage.removeItem("token");
    }
  }, []);

  const login = async (payload: LoginRequest) => {
    const result = await authApi.login(payload);
    console.log("token", result.token);
    localStorage.setItem("token", result.token);
    if (result.token) {
      const decoded = jwtDecode<any>(result.token);
      console.log("decoded", decoded);
      setUser({
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      });
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const registerUser = async (payload: RegisterRequest) => {
    console.log("payload", payload);
    await authApi.register(payload);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext)!;
