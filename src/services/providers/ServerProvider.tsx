/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
	useState,
	useEffect,
	ReactNode,
	useCallback,
	useRef,
} from "react";
import axios from "axios";
import { BASE_URL } from "../../api/config";
import { ServerContext } from "../../contexts/ServerContext";
import { ServerInterface } from "../../@types/server";
import { extractArrayFromResponse } from "../../utils/responseUtils";

export const ServerProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [servers, setServers] = useState<ServerInterface[] | null>(null);
	const [loading, setLoading] = useState(true);
	// Track the latest request
	const latestRequestId = useRef(0);

	const refreshServers = useCallback(async (categoryName?: string) => {
		setServers([]); // Clear servers immediately
		setLoading(true);

		const requestId = ++latestRequestId.current;
		try {
			const token = localStorage.getItem("access_token");
			if (!token) throw new Error("No access token");
			let url = `${BASE_URL}/api/servers/`;
			if (categoryName) url += `?category=${encodeURIComponent(categoryName)}`;
			const res = await axios.get(url, {
				headers: { Authorization: `Bearer ${token}` },
			});

			// DEBUG: Log the response to see what format we're getting
			console.log("=== SERVER API RESPONSE DEBUG ===");
			console.log("Status:", res.status);
			console.log("Response data:", res.data);
			console.log("Is array?", Array.isArray(res.data));
			console.log("Data type:", typeof res.data);
			if (
				res.data &&
				typeof res.data === "object" &&
				!Array.isArray(res.data)
			) {
				console.log("Object keys:", Object.keys(res.data));
			}
			console.log("=== END DEBUG ===");

			// Only update state if this is the latest request
			if (latestRequestId.current === requestId) {
				// Handle both paginated and direct array responses
				const serverData = extractArrayFromResponse<ServerInterface>(res.data);
				setServers(serverData);
			}
		} catch {
			if (latestRequestId.current === requestId) {
				setServers([]);
			}
		}
		if (latestRequestId.current === requestId) {
			setLoading(false);
		}
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
