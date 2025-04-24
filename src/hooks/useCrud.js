import { useState, useCallback, useMemo } from "react";
import { debounce } from "lodash"; // Import debounce from lodash
import useAxiosWithInterceptor from "../api/jwtInterceptor";
import { BASE_URL } from "../api/config";

const useCrud = (initialData, apiURL) => {
  const jwtAxios = useAxiosWithInterceptor();
  const [dataCRUD, setDataCRUD] = useState(initialData);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Define fetchData function
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await jwtAxios.get(`${BASE_URL}${apiURL}`);
      const data = response.data;
      setDataCRUD(data);
      setErr(null); // Clear previous errors on successful fetch
    } catch (error) {
      if (error.response) {
        setErr(new Error("An error occurred"));
      } else {
        setErr(new Error("Network error"));
      }
    } finally {
      setIsLoading(false); // Reset loading state in any case
    }
  }, [jwtAxios, apiURL]); // make sure dependencies are correct for fetchData

  // Memoize debounce to avoid creating a new debounced function on every render
  const debouncedFetchData = useMemo(
    () => debounce(fetchData, 500),
    [fetchData]
  );

  return { fetchData, debouncedFetchData, dataCRUD, err, isLoading };
};

export default useCrud;
