import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authService from "../api/auth.js";
import { isTokenExpired } from "../utils/auth.js";
import { googleLogout } from "@react-oauth/google";

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
            googleLogout();
            set({isAuthenticated: false,
                accessToken: null });
        },
        // adminRegister: async (data) => {
        //     const newUser = await authService.adminRegister(data);
        //     return newUser;
        // }
    }
);

export const useAuthStore = create(
    persist(authConfig, {name: "auth-storage"})
);