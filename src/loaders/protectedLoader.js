import { redirect } from "react-router";
import { useAuthStore } from "../stores/authStores";

function guard(user, allowedRole) {
    // 1. If no user is logged in, kick them to the login page
    if (!user) return redirect('/tsm/login');
    
    // 2. If a specific role is required, but the user doesn't match it...
    if (allowedRole && user.role !== allowedRole) {
        // ...kick them back to their own correct dashboard
        if (user.role === 'ADMIN') {
            return redirect("/tsm/admin");
        } else if (user.role === 'STAFF') {
            return redirect("/tsm/staff");
        } else {
            return redirect("/tsm"); // Fallback just in case
        }
    }

    // 3. SUCCESS! If they are logged in and their role matches, 
    // return the user. DO NOT REDIRECT. This allows the page to load.
    return user;
}

  // if (allowedRole === 'STAFF') {
    //     return redirect("/tsm/staff");
    // } else if (allowedRole === 'ADMIN') {
    //     return redirect("/tsm/admin");
    // }

export const roleLoader = (allowedRole) => () => {
    const user = useAuthStore.getState().user;
    
    return guard(user, allowedRole);
}

export const protectedLoader = () => {
    const user = useAuthStore.getState().user;
    return guard(user);
}