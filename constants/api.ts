import axios from "axios";
import Cookies from "js-cookie";

const isServer = typeof window === "undefined";

// SSR və Client üçün uyğun baseURL
export const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_API_URL_SERVER || "http://127.0.0.1:8000"
    : process.env.NEXT_PUBLIC_API_URL_CLIENT || "http://localhost:8000";

const api = axios.create({
    baseURL: baseUrl,
});

// 🔸 Request interceptor
api.interceptors.request.use(
    (config: any) => {
        // SSR zamanı cookie oxumağa ehtiyac yoxdur
        if (!isServer) {
            const token = Cookies.get("token");

            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 🔸 Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // SSR zamanı window yoxdur
        if (isServer) return Promise.reject(error);

        const originalRequest = error.config;

        if (error?.response?.status === 401) {
            const oldValue = Cookies.get("token");
            Cookies.remove("token");

            // token silindiyini frontend-ə bildirmək üçün event
            const event = new StorageEvent("storage", {
                key: "token",
                oldValue,
                newValue: null,
            });
            window.dispatchEvent(event);

            if (!originalRequest._retry) {
                originalRequest._retry = true;
                window.location.replace("/login");
            }
        }

        return Promise.reject(error);
    }
);

export default api;
