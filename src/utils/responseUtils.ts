import { PaginatedResponse } from "../@types/pagination";

/**
 * Extracts array data from either a direct array response or a paginated response
 * @param data - The API response data
 * @returns The array of items
 */
export function extractArrayFromResponse<T>(
	data: T[] | PaginatedResponse<T>
): T[] {
	return Array.isArray(data) ? data : data.results || [];
}

/**
 * Type guard to check if a response is paginated
 * @param data - The API response data
 * @returns true if the response is paginated
 */
export function isPaginatedResponse<T>(
	data: T[] | PaginatedResponse<T>
): data is PaginatedResponse<T> {
	return !Array.isArray(data) && typeof data === "object" && "results" in data;
}
