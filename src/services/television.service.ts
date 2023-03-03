import type { AxiosError } from 'axios';
import axios from 'axios';
import api from './api';

class TelevisionService {
    getShows = async () => {
        try {
            const response = await api.get('shows');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw { errorStatusCode: (error as AxiosError)?.response?.status };
            }
            throw { errorStatusCode: 500 };
        }
    }

    searchShows = async (query: string) => {
        try {
            const response = await api.get('search/shows', {
                params: { q: query }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw { errorStatusCode: (error as AxiosError)?.response?.status };
            }
            throw { errorStatusCode: 500 };
        }
    }

    getShowDetails = async (showId: string) => {
        try {
            const response = await api.get(`shows/${showId}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw { errorStatusCode: (error as AxiosError)?.response?.status };
            }
            throw { errorStatusCode: 500 };
        }
    }

    getShowCast = async (showId: string) => {
        try {
            const response = await api.get(`shows/${showId}/cast`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw { errorStatusCode: (error as AxiosError)?.response?.status };
            }
            throw { errorStatusCode: 500 };
        }
    }
}

export default new TelevisionService();