import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
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
import AdminLayout from "../layouts/AdminLayout";
import FloorPlan from "../pages/FloorPlan";
import UserPage from "../pages/UserPage";
import AllSessions from "../pages/AllSessions";
import OrderSummary from "../pages/OrderSummary";

const commonPaths = [
  { path: "profile", element: <UserPage /> },
  { path: "sessions", element: <AllSessions /> },
  { path: "sessions/order-preview", element: <OrderSummary /> },
];

const routes = createBrowserRouter([
  // 1. ADMIN SECTION
  {
    path: "/tsm/admin",
    loader: roleLoader("ADMIN"),
    element: <AdminLayout />,
    children: [{ index: true, element: <AdminPage /> }, ...commonPaths],
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

// const routes = createBrowserRouter([
//   // STAFF SECTION
//    {
//     path: "tsm/staff",
//     loader: roleLoader("STAFF"),
//     element: <StaffLayout />,
//     children: [
//       {
//         index: true,
//         element: <FloorPlan />,
//       },
//       {
//         path: "profile",
//         element: <UserPage />,
//       },
//     ],
//   },
//     // ADMIN SECTION
//   {
//     path: "tsm/admin",
//     loader: roleLoader("ADMIN"),
//     element: <AdminLayout />,
//      children: [
//       {
//         index: true,
//         element: <AdminPage />,
//       },
//     ],
//   },
//   // PUBLIC SECTION
//   {
//     path: "tsm",
//     loader: publicLoader,
//     element: <MainLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <Welcome />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "sessions/:id",
//         element: <SessionLayout />,
//         children: [
//           {
//             index: true,
//             element: <SessionInfo />,
//           },
//           {
//             path: "create",
//             element: <NewSessionForm />,
//           },
//           {
//             path: "view",
//             element: <ViewSessions />,
//           },
//         ],
//       },
//     ],
//   },
//   // GLOBAL ERROR
//   {
//     path: "*",
//     loader: () => {
//       throw new Response("Not Found", { status: 404 });
//     },
//     element: <MainLayout />,
//     errorElement: <ErrorPage />,
//   },
// ]);

export default routes;
