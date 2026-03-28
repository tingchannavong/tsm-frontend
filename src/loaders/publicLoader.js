import { redirect } from "react-router"
import { useAuthStore } from "../stores/authStores"


export const publicLoader = () => {
    
    const user = useAuthStore.getState().user;

    if (user) return redirect('/');
}