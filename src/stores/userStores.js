import { create } from "zustand";
import * as userService from "../api/user.js";

export const useUserStore = create((set, get) => (
    {
        user: null,
        setUser: (userData) => set({user: userData}),
        clearUser: () => set({ user: null }) 
    }
));