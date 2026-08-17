import axios from "axios";
import { useAuthStore } from "../stores/authStores.js";

// create axios instance
const baseConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  // VITE_BASE_URL="http://localhost:4000"
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
    }
    return config;
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
    console.log("i status error", error?.response?.status);
    const originalRequest = error.config;
    console.log("originalRequest error.config", originalRequest);

    // in case error because access token is expired
    if (error?.response?.status === 401 && originalRequest.url !== "/api/auth/refresh-token") {
      try {
        // go to refresh token check route, request new access token pls
        const res = await authApi.get("/api/auth/refresh-token");
        // console.log("res", res.data);
        const newAccessToken = res.data.access_token;
        useAuthStore.setState({
          accessToken: newAccessToken,
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // this ask the authApi to call original request again
        return authApi(originalRequest);
      } catch (error) {
        useAuthStore.setState({
          accessToken: null,
        });
        console.log("error at 401 response", error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
