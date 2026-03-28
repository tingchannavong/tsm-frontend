import { redirect } from "react-router";
import { useAuthStore } from "../stores/authStores";

function guard(user, allowedRoles) {
    if (!user) return redirect('/login');
    
    if (allowedRoles) {
        if(!allowedRoles.includes(user.role)) return redirect("/");
    }
}

export const protectedLoader = () => {
    const user = useAuthStore.getState().user;
    return guard(user);
}

export const roleLoader = (allowedRoles) => () => {
    const user = useAuthStore.getState().user;
    
    return guard(user, allowedRoles);
}