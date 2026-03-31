import { redirect } from "react-router";
import { useAuthStore } from "../stores/authStores";

function guard(user, allowedRole) {

    if (!user) return redirect('/tsm/login');
    
    if (allowedRole && user.role !== allowedRole) {
        return redirect(user.role === 'ADMIN' ? "/tsm/admin" : "/tsm/staff");
    }
    return user;
}

export const roleLoader = (allowedRole) => () => {
    const user = useAuthStore.getState().user;
    
    return guard(user, allowedRole);
}

export const protectedLoader = () => {
    const user = useAuthStore.getState().user;
    return guard(user);
}