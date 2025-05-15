import { useState } from "react";
import { AuthServiceProps } from "../@types/auth-service";
import jwtAxios from "../api/jwtinterceptor";

export function useAuthService(): AuthServiceProps {
  const getInitialLoggedInValue = () => {
    const token = localStorage.getItem("access_token");
    // check token expiration here
    return !!token;
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getInitialLoggedInValue
  );

  const login = async (username: string, password: string) => {
    try {
      const response = await jwtAxios.post("/api/token/", {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      throw err;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  };

  return { login, isAuthenticated, logout };
}
