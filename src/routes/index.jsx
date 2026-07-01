import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import { protectedLoader, roleLoader } from "../loaders/protectedLoader";
import { publicLoader } from "../loaders/publicLoader";
import MainLayout from "../layouts/MainLayout";
import SessionInfo from "../pages/SessionInfo";
import ErrorPage from "../pages/ErrorPage";
import SessionLayout from "../layouts/SessionLayout";
import NewSessionForm from "../pages/NewSessionForm";
import ViewSessions from "../pages/ViewSessions";
import Welcome from "../pages/Welcome";
import StaffLayout from "../layouts/StaffLayout";
import AdminLayout from "../layouts/AdminLayout";
import FloorPlan from "../pages/FloorPlan";
import UserPage from "../pages/UserPage";
import AllSessions from "../pages/AllSessions";
import OrderSummary from "../pages/OrderSummary";
import AllOrders from "../pages/AllOrders";
import ViewOrderDetails from "../pages/ViewOrderDetails";
import ResetPasswordForm from "../pages/ResetPasswordForm";
import ForgotPasswordForm from "../pages/ForgotPasswordForm";
import UserManagement from "../pages/admin/UserManagement";
import LocationManagement from "../pages/admin/LocationManagement";
import PricingManagement from "../pages/admin/PricingManagement";

const commonPaths = [
  { path: "profile", element: <UserPage /> },
  { path: "sessions", element: <AllSessions /> },
  { path: "sessions/order-preview", element: <OrderSummary /> },
  { path: "orders/:id", element: <ViewOrderDetails /> },
  { path: "orders", element: <AllOrders /> },
];

const routes = createBrowserRouter([
  // 1. ADMIN SECTION
  {
    path: "/tsm/admin",
    loader: roleLoader("ADMIN"),
    element: <AdminLayout />,
    children: [
      { index: true, element: <FloorPlan /> },
      { path: "users", element: <UserManagement /> },
      { path: "locations", element: <LocationManagement /> },
      { path: "pricings", element: <PricingManagement /> },
      ...commonPaths,
    ],
  },

  // 2. STAFF SECTION
  {
    path: "/tsm/staff",
    loader: roleLoader("STAFF"),
    element: <StaffLayout />,
    children: [{ index: true, element: <FloorPlan /> }, ...commonPaths],
  },

  // 3. PUBLIC SECTION
  {
    path: "/tsm",
    loader: publicLoader,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPasswordForm /> },
      { path: "reset-password/:token", element: <ResetPasswordForm /> },
      {
        path: "sessions/:id",
        element: <SessionLayout />,
        children: [
          { index: true, element: <SessionInfo /> },
          { path: "create", element: <NewSessionForm /> },
          { path: "view", element: <ViewSessions /> },
        ],
      },
    ],
  },

  // 4. GLOBAL ERROR (Simple 404)
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routes;
