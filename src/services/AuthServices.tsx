import { useState } from "react";
import { AuthServiceProps } from "../@types/auth-service";
import { BASE_URL } from "../api/config";
import axios from "axios";

export function useAuthService(): AuthServiceProps {
  const getInitialLoggedInValue = () => {
    const authenticated = localStorage.getItem("isLoggedIn");
    return authenticated !== null && authenticated === "true";
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getInitialLoggedInValue
  );

  const getUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get(
        `${BASE_URL}/api/account/?user=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userDetails = response.data;
      localStorage.setItem("username", userDetails.username);
      localStorage.setItem("isLoggedIn", "true");
      setIsAuthenticated(true);
    } catch (err: unknown) {
      localStorage.setItem("isLoggedIn", "false");
      setIsAuthenticated(false);
      return err;
    }
  };

  const getUserIdFromToken = (access: string) => {
    const token = access;
    const tokenParts = token.split(".");
    const encodedPayLoad = tokenParts[1];
    const decodedPayload = atob(encodedPayLoad);
    const payLoadData = JSON.parse(decodedPayload);
    const userId = payLoadData.user_id;
    return userId;
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/token/`, {
        username,
        password,
      });

      console.log(response);

      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("userId", getUserIdFromToken(access));
      localStorage.setItem("isLoggedIn", "true");
      setIsAuthenticated(true);
      getUserDetails();

      console.log(response);
    } catch (err: unknown) {
      localStorage.setItem("isLoggedIn", "false");
      setIsAuthenticated(false);
      return err;
    }
  };

  const logout = () => {
    localStorage.clear();
    localStorage.setItem("isLoggedIn", "false");
    setIsAuthenticated(false);
  };

  return { login, isAuthenticated, logout };
}
