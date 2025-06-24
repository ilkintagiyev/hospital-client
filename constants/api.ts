import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const baseUrl = "http://localhost:8000";

const api = axios.create({
    baseURL: baseUrl,
});

api.interceptors.request.use((config: any) => {
    // Retrieve the token from cookies
    const token = Cookies.get('token');


    // Attach the token to the Authorization header if it exists
    if (token) {
        config.headers = {
            ...config.headers,  // Don't overwrite other existing headers
            Authorization: `Bearer ${token}`,
        };
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Handle the response, particularly for 401 Unauthorized (token expired/invalid)
api.interceptors.response.use(
    (response) => response, // On success, just return the response
    async (error) => {
        const originalRequest = error.config;

        // If the response is 401 (Unauthorized), remove the token and redirect to login
        if (error?.response?.status === 401) {
            // Remove token from cookies
            const oldValue = Cookies.get('token');
            Cookies.remove('token');

            // Dispatch a StorageEvent (optional, in case you need to listen for token removal)
            const event = new StorageEvent('storage', {
                key: 'token',
                oldValue,
                newValue: null,
            });
            window.dispatchEvent(event);

            // Redirect the user to the login page
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                window.location.replace('/login');
            }
        }

        return Promise.reject(error);
    }
);

export default api;
