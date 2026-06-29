import { create } from "zustand";
import * as userService from "../api/user.js";

export const useUserStore = create((set, get) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
  updateUser: async (id, updatedData) => {
    try {
      await userService.updateUserById(id, updatedData);
      set((state) => ({
        user: state.user ? { ...state.user, ...updatedData } : updatedData,
      }));
    } catch (error) {
      console.log('error at zustand user store', error);
      throw error;
    }
  },
}));
