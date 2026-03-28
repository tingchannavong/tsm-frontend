import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
    try {
        const { expired } = jwtDecode(token);
        return Date.now() >= expired * 1000; // convert to millisecs 
    } catch (error) {
        return true;
    }
}