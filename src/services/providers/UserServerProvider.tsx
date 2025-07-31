import React, { useState, useEffect, useCallback, ReactNode } from "react";
import axios from "axios";
import { ServerInterface } from "../../@types/server";
import { BASE_URL } from "../../api/config";
import { UserServerContext } from "../../contexts/UserServerContext";
import { extractArrayFromResponse } from "../../utils/responseUtils";

export const UserServerProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [servers, setServers] = useState<ServerInterface[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchServers = useCallback(async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem("access_token");
			const res = await axios.get(`${BASE_URL}/api/account/my_servers/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			// Handle both paginated and direct array responses
			const serverData = extractArrayFromResponse<ServerInterface>(res.data);
			setServers(serverData);
		} catch {
			setServers([]);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchServers();
	}, [fetchServers]);

	// Expose fetchServers as 'refresh' so it can be called after create/delete
	return (
		<UserServerContext.Provider
			value={{ servers, loading, refresh: fetchServers }}
		>
			{children}
		</UserServerContext.Provider>
	);
};
