import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const baseUrl = "http://localhost:8000";

const api = axios.create({
    baseURL: baseUrl,
});

api.interceptors.request.use((config: any) => {
    const token = Cookies.get('token');


    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401) {
            const oldValue = Cookies.get('token');
            Cookies.remove('token');

            const event = new StorageEvent('storage', {
                key: 'token',
                oldValue,
                newValue: null,
            });
            window.dispatchEvent(event);

            if (!originalRequest._retry) {
                originalRequest._retry = true;
                window.location.replace('/login');
            }
        }

        return Promise.reject(error);
    }
);

export default api;
