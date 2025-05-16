import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { BASE_URL } from "../api/config";
import { ServerContext } from "../contexts/ServerContext";
import { ServerInterface } from "../@types/server";
import { CategoryInterface } from "../@types/category";
import { NewServerData } from "../contexts/ServerContext";

export const ServerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [servers, setServers] = useState<ServerInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingServers, setLoadingServers] = useState(false);

  // Fetch all servers (optionally by category)
  const refreshServers = async (categoryName?: string) => {
    setLoadingServers(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token");

      let url = `${BASE_URL}/api/servers/`;
      if (categoryName) url += `?category=${encodeURIComponent(categoryName)}`;

      const res = await axios.get<ServerInterface[]>(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServers(res.data);
    } catch {
      setServers([]);
    }
    setLoadingServers(false);
  };

  // Fetch all categories (only on mount or explicit refresh)
  const refreshCategories = async () => {
    console.log("Fetching categories...");
    setLoadingCategories(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token");

      const res = await axios.get<CategoryInterface[]>(
        `${BASE_URL}/api/categories/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(res.data);
    } catch {
      setCategories([]);
    }
    setLoadingCategories(false);
  };

  // Fetch categories ONCE on mount
  useEffect(() => {
    refreshCategories();
    // eslint-disable-next-line
  }, []);

  const addServer = async (data: NewServerData) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token");
    await axios.post(`${BASE_URL}/api/servers/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await refreshServers();
  };

  return (
    <ServerContext.Provider
      value={{
        servers,
        categories,
        loadingServers,
        loadingCategories,
        refreshServers,
        refreshCategories,
        addServer,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};
