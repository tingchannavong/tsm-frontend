import axios from "axios";
import { useAuthStore } from "../stores/authStores.js";

// create axios instance
const baseConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  withCredentials: true,
};

export const publicApi = axios.create(baseConfig);
export const authApi = axios.create(baseConfig);

// intercept request before sending out
// 1st arg is configuring what we are sending, 2nd arg is for error
// attach token before calling api route
authApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken; // get directly without re-render need

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  },
  (error) => {
    // interceptor is a promise
    return Promise.reject(error);
  },
);

// 2) intercept response before rendering html
authApi.interceptors.response.use(
  (response) => {
    // if response is successful, go ahead and return response
    return response;
  },
  async (error) => {
      console.log('i status error', error?.response?.status);
      console.log('interceptor error', error);
      // in case error because access token is expired
    if (error?.response?.status === 401) {
        try {
            // go to refresh token check route, request new access token pls
            const res = await authApi.get("/api/auth/refresh-token");
            console.log('res', res)
        } catch (error) {
            console.log('error at 401 response', error)
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
  },
);
