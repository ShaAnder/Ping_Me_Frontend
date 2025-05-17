import React, { useState, useEffect, ReactNode, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/config";
import { ServerContext } from "../../contexts/ServerContext";
import { ServerInterface } from "../../@types/server";
import { CategoryInterface } from "../../@types/category";
import { NewServerData } from "../../contexts/ServerContext";

// Message type
export interface Message {
  sender: string;
  content: string;
  timestamp_created: string;
  timestamp_updated: string;
}

export const ServerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [servers, setServers] = useState<ServerInterface[] | null>(null);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingServers, setLoadingServers] = useState(true);

  // --- Messages state ---
  const [messagesByChannel, setMessagesByChannel] = useState<{
    [channelId: string]: Message[];
  }>({});
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Fetch messages for a given channel
  const fetchMessagesForChannel = useCallback(async (channelId: string) => {
    setLoadingMessages(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token");
      const res = await axios.get<Message[]>(
        `${BASE_URL}/api/messages/?channel_id=${channelId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessagesByChannel((prev) => ({ ...prev, [channelId]: res.data }));
    } catch {
      setMessagesByChannel((prev) => ({ ...prev, [channelId]: [] }));
    }
    setLoadingMessages(false);
  }, []);

  // --- Servers and categories logic ---
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
      setServers([]); // If fetch fails, set to empty array
    }
    setLoadingServers(false);
  };

  const refreshCategories = async () => {
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

  useEffect(() => {
    refreshServers();
    refreshCategories();
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
        // --- messages context values ---
        messagesByChannel,
        loadingMessages,
        fetchMessagesForChannel,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};
