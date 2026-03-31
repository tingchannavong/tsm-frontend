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
import ViewSessions from "../pages/ViewSessions";
import Welcome from "../pages/Welcome";
import StaffLayout from "../layouts/StaffLayout";

const routes = createBrowserRouter([
  {
    path: "*",
    loader: () => {
      throw new Response("Not Found", { status: 404 });
    },
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
        index: true,
        element: <Welcome />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sessions/:id",
        element: <SessionLayout />,
        children: [
          {
            index: true,
            element: <SessionInfo />,
          },
          {
            path: "create",
            element: <NewSessionForm />,
          },
          {
            path: "view",
            element: <ViewSessions />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    loader: protectedLoader,
    element: <StaffLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/admin",
    loader: roleLoader(["ADMIN"]),
    element: <AdminPage />,
  },
]);

export default routes;
