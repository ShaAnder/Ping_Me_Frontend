import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/config";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { CategoryInterface } from "../../@types/category";
import { extractArrayFromResponse } from "../../utils/responseUtils";

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [categories, setCategories] = useState<CategoryInterface[]>([]);
	const [loading, setLoading] = useState(true);

	const refreshCategories = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem("access_token");
			if (!token) throw new Error("No access token");
			const res = await axios.get(`${BASE_URL}/api/categories/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			// Handle both paginated and direct array responses
			const categoryData = extractArrayFromResponse<CategoryInterface>(
				res.data
			);
			setCategories(categoryData);
		} catch {
			setCategories([]);
		}
		setLoading(false);
	};

	useEffect(() => {
		refreshCategories();
	}, []);

	return (
		<CategoriesContext.Provider
			value={{ categories, loading, refreshCategories }}
		>
			{children}
		</CategoriesContext.Provider>
	);
};
