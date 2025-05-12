import { AuthServiceProps } from "../@types/auth-service";
import { BASE_URL } from "../api/config";
import axios from "axios";

export function useAuthService(): AuthServiceProps {
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

      console.log(response);
    } catch (err: unknown) {
      return err;
    }
  };
  return { login };
}
