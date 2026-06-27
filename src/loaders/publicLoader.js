import { redirect } from "react-router-dom"
import { useUserStore } from "../stores/userStores";

export const publicLoader = ({ request }) => {
    
    const user = useUserStore.getState().user;
    const url = new URL(request.url);

   if (user && (url.pathname === "/tsm" || url.pathname === "/tsm/login")) {
        if (user.role === "ADMIN") {return redirect("/tsm/admin")};
        return redirect("/tsm/staff");
    }

    return null;
}