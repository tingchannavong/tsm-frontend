import { redirect } from "react-router-dom"
import { useUserStore } from "../stores/userStores.js";
import { getUser } from "./protectedLoader.js";

export const publicLoader = async ({ request }) => {
    
    const user = await getUser();
    const url = new URL(request.url);

   if (user && (url.pathname === "/tsm" || url.pathname === "/tsm/login")) {
        if (user.role === "ADMIN") {return redirect("/tsm/admin")};
        return redirect("/tsm/staff");
    }

    return null;
}