import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authService from "../api/auth.js";
import { isTokenExpired } from "../utils/tokenUtils.js";

const authConfig = (set, get) => (
    {
        accessToken: null,
        user: null,
        login: async (username, password) => {
            // connect backend API here
            const userData = await authService.login(username, password);
            set({accessToken: userData.access_token});

            await get().fetchUser();
        },
        fetchUser: async () => {
            const token = get().accessToken;
            if (!token) return;

            if (isTokenExpired(token)) {
                await get().logout();
            } 

            const userData = await authService.fetchMe();
            set({user: userData})    
        },
        logout: () => {
            set({accessToken: null, user: null });
        }
    }
);

export const useAuthStore = create(
    persist(authConfig, {name: "auth-storage"})
);