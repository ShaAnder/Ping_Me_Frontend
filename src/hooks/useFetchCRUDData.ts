import { useState } from "react";
import jwtAxios from "../api/jwtinterceptor";

interface UseCrudResult<T> {
  dataCRUD: T[];
  fetchData: (params?: Record<string, unknown>) => Promise<T[]>;
  error: Error | null;
  loading: boolean;
}

const useCrud = <T>(initialData: T[], apiURL: string): UseCrudResult<T> => {
  const [dataCRUD, setDataCRUD] = useState<T[]>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params?: Record<string, unknown>) => {
    setLoading(true);
    try {
      const response = await jwtAxios.get<T[]>(apiURL, { params });
      setDataCRUD(response.data ?? []);
      setError(null);
      return response.data ?? [];
    } catch (err: unknown) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setDataCRUD([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { dataCRUD, fetchData, error, loading };
};

export default useCrud;
