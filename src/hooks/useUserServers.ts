import { useEffect, useState } from "react";
import axios from "axios";

import { ServerInterface } from "../@types/server";
import { BASE_URL } from "../api/config";

export function useUserServers() {
  const [servers, setServers] = useState<ServerInterface[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(servers);

  useEffect(() => {
    const fetchServers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(`${BASE_URL}/api/account/my_servers/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServers(res.data);
      } catch (err) {
        console.log(err);
        setServers([]);
      }
      setLoading(false);
    };
    fetchServers();
  }, []);

  return { servers, loading };
}
