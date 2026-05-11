import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { ClipLoader } from "react-spinners";
import Protected from "@/features/auth/components/Protected";

// Lazy load pages — critical for performance
// Each page chunk is only loaded when needed
const LandingPage = lazy(() => import("@/shared/pages/LandingPage"));
const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/DashboardPage"),
);
const LoginPage = lazy(() => import("@/features/auth/components/Login"));
const RegisterPage = lazy(() => import("@/features/auth/components/Register"));
const MeetingPage = lazy(() => import("@/features/meeting/pages/MeetingPage"));
const PreJoinPage = lazy(() => import("@/features/meeting/pages/PreJoinPage"));
const About = lazy(() => import("@/shared/pages/About"));
const AppLayout = lazy(() => import("@/app/AppLayout"));

const router = createBrowserRouter([
  {
    // Public routes (no auth)
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <ClipLoader color="#9C27B0" />
          </div>
        }
      >
        <Layout />
      </Suspense>
    ),
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "about", element: <About /> },

      // Protected routes (require Clerk auth)
    ],
  },
  {
    path: "/",
    element: (
      <Protected>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <ClipLoader color="#9C27B0" />
            </div>
          }
        >
          <AppLayout/>
        </Suspense>
      </Protected>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "meeting/prejoin/:roomId",
        element: <PreJoinPage />,
      },
    ],
  },

  {
    // Meeting room — fullscreen, no sidebar/nav
    path: "/meeting/:roomId",
    element: (
      <Protected>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <ClipLoader color="#9C27B0" />
            </div>
          }
        >
          <MeetingPage />
        </Suspense>
      </Protected>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
