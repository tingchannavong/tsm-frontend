import { createBrowserRouter } from "react-router";
import { protectedLoader, roleLoader } from "../loaders/protectedLoader";
import { publicLoader } from "../loaders/publicLoader";
import { Navigate } from "react-router";
import Login from "../pages/Login";
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
import RegisterForm from "../pages/admin/RegisterForm";

const commonPaths = [
  { path: "profile", element: <UserPage /> },
  { path: "sessions", element: <AllSessions /> },
  { path: "sessions/order-preview", element: <OrderSummary /> },
  { path: "orders/:id", element: <ViewOrderDetails /> },
  { path: "orders", element: <AllOrders /> },
  { path: "floorplan", element: <FloorPlan /> },
];

const routes = createBrowserRouter([
  // 1. ADMIN SECTION
  {
    path: "/tsm/admin",
    loader: roleLoader("ADMIN"),
    element: <AdminLayout />,
    children: [
      { index: true, element: < Navigate to="locations" replace /> },
      { path: "locations", element: <LocationManagement /> },
      { path: "users", element: <UserManagement /> },
      { path: "pricings", element: <PricingManagement /> },
      { path: "register-user", element: <RegisterForm mode="ADMIN" /> },
      ...commonPaths,
    ],
  },

  // 2. STAFF SECTION
  {
    path: "/tsm/staff",
    loader: roleLoader("STAFF"),
    element: <StaffLayout />,
    children: [{ index: true, element: < Navigate to="floorplan" replace />}, ...commonPaths],
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
      { path: "register-invite/:token", element: <RegisterForm mode="INVITE"/> },
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
