import { useState } from "react";
import useJWTAxiosInterceptor from "../api/jwtinterceptor";
import { BASE_URL } from "../api/config";

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
    try {
      const response = await jwt.get(`${BASE_URL}/api${apiURL}`);
      const data = response?.data ?? [];
      setDataCRUD(data);
      setError(null);
      return data;
    } catch (error: unknown) {
      console.error("Fetch error:", error);
      setError(error instanceof Error ? error : new Error("Unknown error"));
      setDataCRUD([]); // fallback
      return []; // avoid unhandled promise rejection
    } finally {
      setLoading(false);
    }
  };
  return { fetchData, loading, error, dataCRUD };
};

export default useCrud;
