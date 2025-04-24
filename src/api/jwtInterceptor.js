import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";

const useAxiosWithInterceptor = () => {
  const navigate = useNavigate();

  const jwtAxios = axios.create({
    baseURL: BASE_URL,
  });

  jwtAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        navigate("/"); // Redirect to root on 401 Unauthorized error
      }
      return Promise.reject(error); // Always return the error for further handling
    }
  );

  return jwtAxios;
};

export default useAxiosWithInterceptor;
