import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import DashboardPage from "../pages/DashboardPage";
import { protectedLoader, roleLoader } from "../loaders/protectedLoader";
import { publicLoader } from "../loaders/publicLoader";
import AdminPage from "../pages/AdminPage";
import MainLayout from "../layouts/MainLayout";
import SessionInfo from "../pages/SessionInfo";
import ErrorPage from "../pages/ErrorPage";
import SessionLayout from "../layouts/SessionLayout";
import NewSessionForm from "../pages/NewSessionForm";

const routes = createBrowserRouter([
  {
    path: "/",
    loader: publicLoader,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tsm",
    loader: publicLoader,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sessions", 
        element: <SessionLayout />,
        children: [
          {
        index: true, 
        element: <SessionInfo />,
      },
           {
        path: ":id", // /:location-id
        element: <SessionInfo />,
      },
         {
          path: "create",
        element: <NewSessionForm />,
      },
        ]
      },
    ],
  },
  {
    path: "/",
    loader: protectedLoader,
    element: <DashboardPage />,
  },
  {
    path: "/admin",
    loader: roleLoader(["ADMIN", "SUPERADMIN"]),
    element: <AdminPage />,
  },
]);

export default routes;
