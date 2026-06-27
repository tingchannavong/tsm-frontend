import { useEffect } from "react";
import { useAuthStore } from "../stores/authStores.js";
import { useUserStore } from "../stores/userStores.js";
import { isTokenExpired } from "../utils/auth.js";
import { fetchMe } from "../api/user.js";
import { toast } from "react-toastify";
import * as userService from "../api/user.js";

export const useUserSync = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

    const syncUser = async () => {
      if (!accessToken || isTokenExpired(accessToken)) {
        logout();
        return;
      }

      try {
        const userData = await userService.fetchMe();
        setUser(userData);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error(error?.response?.data?.message || "Failed to sync user");
      }
    };

  useEffect(() => {
    if (isAuthenticated) {
      syncUser();
    } else {
      clearUser();
    }
  }, [isAuthenticated, accessToken, logout, setUser, clearUser]);
};
