
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../stores/userStores";

export function getHomePath() {
    const user = useUserStore.getState().user;
    if (!user) return "/tsm/login";
    if (user.role === "ADMIN") return "/tsm/admin";
    if (user.role === "STAFF") return "/tsm/staff";
    return "/tsm";
};

export function havePermission() {
  const user = useUserStore.getState().user;
  if (!user) return false;
  return ["ADMIN", "STAFF"].includes(user.role);
}

export function isTokenExpired(token) {
    if (!token) return true; 

    try {
        const decoded = jwtDecode(token);
        // Standard JWT field is 'exp'
        const expiryTime = decoded.exp; 
        
        if (!expiryTime) return false; // token hasnt expired

        return Date.now() >= expiryTime * 1000; 
    } catch (error) {
        return true; // If decoding fails, treat as expired/invalid
    }
}
