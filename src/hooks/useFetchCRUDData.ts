import { useState } from "react";
import useJWTAxiosInterceptor from "../api/jwtinterceptor";
import { BASE_URL } from "../api/config";
import axios from "axios";

interface IuseCrud<T> {
  dataCRUD: T[];
  fetchData: () => Promise<void>;
  error: Error | null;
  loading: boolean;
}

const useCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
  const jwt = useJWTAxiosInterceptor();
  const [dataCRUD, setDataCRUD] = useState<T[]>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    //logic
    try {
      const response = await jwt.get(`${BASE_URL}/api${apiURL}`, {});
      const data = response.data;
      setDataCRUD(data);
      setError(null);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setError(new Error("400"));
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { fetchData, loading, error, dataCRUD };
};

export default useCrud;
