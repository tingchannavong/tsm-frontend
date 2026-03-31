
import { useAuthStore } from "../stores/authStores";

export const getHomePath = () => {
    const user = useAuthStore.getState().user;
    if (!user) return "/tsm/login";
    if (user.role === "ADMIN") return "/tsm/admin";
    if (user.role === "STAFF") return "/tsm/staff";
    return "/tsm";
};
