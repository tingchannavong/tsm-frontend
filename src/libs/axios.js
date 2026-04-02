import axios from "axios";
import { useAuthStore } from "../stores/authStores.js";

// create axios instance
const baseConfig = {
    baseURL: "http://localhost:9999",
    timeout: 5000
};

export const publicApi = axios.create(baseConfig);
export const authApi = axios.create(baseConfig);

// axios interceptor have the config ready
authApi.interceptors.request.use( (config) => {
    const token = useAuthStore.getState().accessToken; // get directly without re-render need

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }
});