import axios, { AxiosError } from 'axios';
import type { ApiResponse, Character, CharacterFilter, Episode } from '../types';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Axios instance configured for Rick and Morty API
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            // Server responded with error
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error:', error.message);
        }
        return Promise.reject(error);
    }
);

/**
 * Fetches a list of characters with optional filters and pagination
 * @param params - Optional filters (name, status, species, gender, page)
 * @returns Promise with paginated character results
 */
export const getCharacters = async (params?: CharacterFilter): Promise<ApiResponse<Character>> => {
    const response = await apiClient.get<ApiResponse<Character>>('/character', { params });
    return response.data;
};

/**
 * Fetches a single character by ID
 * @param id - Character ID
 * @returns Promise with character data
 */
export const getCharacter = async (id: number): Promise<Character> => {
    const response = await apiClient.get<Character>(`/character/${id}`);
    return response.data;
};

/**
 * Fetches one or more episodes by their IDs
 * @param ids - Array of episode IDs
 * @returns Promise with episode data (single Episode or array of Episodes)
 */
export const getEpisodes = async (ids: number[]): Promise<Episode | Episode[]> => {
    // If ids is empty, return empty array
    if (ids.length === 0) return [];

    // If single ID, the API returns a single object, not an array.
    // If multiple IDs, it returns an array.
    const response = await apiClient.get<Episode | Episode[]>(`/episode/${ids.join(',')}`);
    return response.data;
};

/**
 * Helper function to extract episode IDs from episode URLs
 * @param urls - Array of episode URLs from the API
 * @returns Array of episode IDs
 */
export const getEpisodeIdsFromUrls = (urls: string[]): number[] => {
    return urls.map((url) => {
        const parts = url.split('/');
        return parseInt(parts[parts.length - 1], 10);
    });
};
