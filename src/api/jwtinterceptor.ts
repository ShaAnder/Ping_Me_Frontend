import axios, { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";

const API_URL = `${BASE_URL}/api`;

const useJWTAxiosInterceptor = (): AxiosInstance => {
  const jwtAxios = axios.create({
    baseURL: API_URL,
  });
  const navigate = useNavigate();

  jwtAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (err) => {
      const originalRequest = err.config;
      if (err.response?.status === 401) {
        const redirectHome = () => navigate("/");
        redirectHome();
      }
    }
  );
  return jwtAxios;
};

export default useJWTAxiosInterceptor;
