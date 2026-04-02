import { jwtDecode } from "jwt-decode";

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

/
