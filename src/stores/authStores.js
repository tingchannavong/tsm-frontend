import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authService from "../api/auth.js";
import { isTokenExpired } from "../utils/auth.js";

const authConfig = (set, get) => (
    {
        isAuthenticated: false,
        accessToken: null,
        login: async (username, password) => {
            // connect backend API here
            const userData = await authService.login(username, password);
            set({
                isAuthenticated: true,
                accessToken: userData.access_token,
            });

            // await get().fetchUser();
        },
        logout: async () => {
            await authService.logout();
            set({isAuthenticated: false,
                accessToken: null });
        }
    }
);

export const useAuthStore = create(
    persist(authConfig, {name: "auth-storage"})
);