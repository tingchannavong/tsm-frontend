import { useEffect } from "react";
import { useAuthStore } from "../stores/authStores.js";
import { useUserStore } from "../stores/userStores.js";
import { isTokenExpired } from "../utils/auth.js";
import { fetchMe } from "../api/user.js";
import { toast } from "react-toastify";
import * as userService from "../api/user.js";

export const useUserSync = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearUser = useUserStore((state) => state.clearUser);
  const syncUser = useUserStore((state) => state.syncUser);

  useEffect(() => {
    if (isAuthenticated) {
      syncUser({
        onError: (error) =>
          toast.error(error?.response?.data?.message || "Failed to sync user"),
      });
    } else {
      clearUser();
    }
  }, [isAuthenticated, syncUser, clearUser]); //accessToken, logout, setUser, 
};
