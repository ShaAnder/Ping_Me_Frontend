/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ReactNode, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/config";
import { ServerContext } from "../../contexts/ServerContext";
import { ServerInterface } from "../../@types/server";

export const ServerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [servers, setServers] = useState<ServerInterface[] | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshServers = useCallback(async (categoryName?: string) => {
    setLoading(true);
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
    setLoading(false);
  }, []);

  const addServer = async (data: any) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token");
    await axios.post(`${BASE_URL}/api/servers/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await refreshServers();
  };

  useEffect(() => {
    refreshServers();
  }, [refreshServers]);

  return (
    <ServerContext.Provider
      value={{ servers, loading, refreshServers, addServer }}
    >
      {children}
    </ServerContext.Provider>
  );
};
