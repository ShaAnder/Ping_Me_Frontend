import React, { useEffect, useRef } from "react";
import useCrud from "../../hooks/useCrud";
import PopularServers from "./PopularServers";
import LoadingSpinner from "../utils/Loader";

export default function ServerByCategory({ category }) {
  // Ref to keep track of the previous category
  const prevCategoryRef = useRef();

  const {
    fetchData,
    dataCRUD: servers,
    isLoading,
    err,
  } = useCrud([], `/api/servers/?category=${encodeURIComponent(category)}`);

  useEffect(() => {
    // Check if the category has changed
    if (prevCategoryRef.current !== category) {
      fetchData(); // Fetch new data
      prevCategoryRef.current = category; // Update the ref with the new category
    }
  }, [category, fetchData]);

  if (isLoading) return <LoadingSpinner />;
  if (err) return <p>Failed to load servers.</p>;
  if (!servers.length) return <p>No servers found in “{category}”.</p>;

  return <PopularServers servers={servers} />;
}
