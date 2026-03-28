import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import DashboardPage from "../pages/DashboardPage";
import { protectedLoader, roleLoader } from "../loaders/protectedLoader" 
import { publicLoader } from "../loaders/publicLoader" 
import AdminPage from "../pages/AdminPage";

const routes = createBrowserRouter([
    {
        path: "/",
        loader: protectedLoader,
        element: <DashboardPage/>
    },
    {
        path:"/login",
        loader: publicLoader,
        element: <Login/>
    },
    {
        path: "/admin",
        loader: roleLoader(["ADMIN", "SUPERADMIN"]),
        element: <AdminPage/>
    }
]);

export default routes;