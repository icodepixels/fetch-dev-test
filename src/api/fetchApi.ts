import axios from 'axios';
import { Dog, SearchFilters, SearchResponse } from '../types/types';

const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const fetchApi = {
    login: async (name: string, email: string) => {
        return api.post('/auth/login', { name, email });
    },

    logout: async () => {
        return api.post('/auth/logout');
    },

    getBreeds: async (): Promise<string[]> => {
        const response = await api.get('/dogs/breeds');
        return response.data;
    },

    searchDogs: async (filters: SearchFilters): Promise<SearchResponse> => {
        const response = await api.get('/dogs/search', { params: filters });
        return response.data;
    },

    getDogs: async (dogIds: string[]): Promise<Dog[]> => {
        const response = await api.post('/dogs', dogIds);
        return response.data;
    },

    getMatch: async (dogIds: string[]): Promise<{ match: string }> => {
        const response = await api.post('/dogs/match', dogIds);
        return response.data;
    }
};