import axios, { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";

const useJWTAxiosInterceptor = (): AxiosInstance => {
  const jwtAxios = axios.create({
    baseURL: BASE_URL,
  });
  const navigate = useNavigate();

  jwtAxios.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response?.status === 401 || err.response?.status === 400) {
        navigate("/");
      }
      return Promise.reject(err);
    }
  );

  return jwtAxios;
};

export default useJWTAxiosInterceptor;
