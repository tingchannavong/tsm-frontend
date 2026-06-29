import { create } from "zustand";
import * as userService from "../api/user.js";
import { useAuthStore } from "./authStores.js";
import { isTokenExpired } from "../utils/auth.js";

export const useUserStore = create((set, get) => ({
  user: null,
  _syncPromise: null, // request for dedupe

  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),

  updateUser: async (id, updatedData) => {
    try {
      await userService.updateUserById(id, updatedData);
      set((state) => ({
        user: state.user ? { ...state.user, ...updatedData } : updatedData,
      }));
    } catch (error) {
      console.log("error at zustand user store", error);
      throw error;
    }
  },

  syncUser: async ({ onError } = {}) => {
  // 1. Check if a promise already exists
  const existing = get()._syncPromise;
  if (existing) {
    console.log("Dedupe: Joining existing request...");
    return existing;
  }

  const { accessToken, logout } = useAuthStore.getState();

    if (!accessToken || isTokenExpired(accessToken)) {
      console.log("no access token yet");
      logout();
      set({ user: null });
      return null;
    }

  // 2. Create the promise and store it
  const promise = (async () => {
    try {
      const userData = await userService.fetchMe();
      set({ user: userData });
      return userData;
    } catch (error) {
      onError?.(error);
      set({ user: null });
      return null;
    } finally {
      // 3. Clear the promise from state when done (success or fail)
      set({ _syncPromise: null });
    }
  })();

  // 4. Assign to state immediately
  set({ _syncPromise: promise });
  return promise;
},

}));
