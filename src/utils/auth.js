
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../stores/userStores";
import { getUser } from "../loaders/protectedLoader.js";
import Swal from 'sweetalert2';

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

export function isAdmin() {
  const user = useUserStore.getState().user;
  if (!user) return false;
  return ["ADMIN"].includes(user.role);
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

export const handleGoogleAuthError = (error, navigate) => {
  const errorData = error.response?.data;
  
  if (error.response?.status === 409 && errorData?.requiresLinking) {
    Swal.fire({
      icon: "warning",
      title: "Account Already Exists",
      html: `
        An account already exists for <b>${errorData.existingUser.email}</b>.<br>
        Username: <b>${errorData.existingUser.username}</b><br><br>
        Please log in using your password instead.
      `,
      confirmButtonText: "Go to Login",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/tsm/login");
      }
    });
  } else {
    console.log("Backend google auth failed", error);
  }
};
