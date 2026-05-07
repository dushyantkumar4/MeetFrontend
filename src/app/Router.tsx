import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Layout from "./Layout";
import { ClipLoader } from "react-spinners";
import Protected from "@/features/auth/components/Protected";

// Lazy load pages — critical for performance
// Each page chunk is only loaded when needed
const LandingPage = lazy(()=>import ("@/shared/components/LandingPage"))
const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/DashboardPage"),
);
const LoginPage = lazy(() => import("@/features/auth/components/Login"));
const RegisterPage = lazy(() => import("@/features/auth/components/Register"));
const MeetingPage = lazy(() => import("@/features/meeting/pages/MeetingPage"));
const PreJoinPage = lazy(() => import("@/features/meeting/pages/PreJoinPage"));

const router = createBrowserRouter([
  {
    // Public routes (no auth)
    path: "/",
    element: (
      <Suspense fallback={<ClipLoader color="#e1e2f5" />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    // Protected routes (require Clerk auth)
    path: "/app",
    element: (
      // <ProtectedRoute>
      <Layout />
      // </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/app/dashboard" /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "meeting/prejoin/:roomId", element: <PreJoinPage /> },
    ],
  },
  {
    // Meeting room — fullscreen, no sidebar/nav
    path: "/meeting/:roomId",
    element: (
      <Suspense fallback={<ClipLoader color="#e1e2f5" className=""/>}>
        <MeetingPage />
      </Suspense>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
