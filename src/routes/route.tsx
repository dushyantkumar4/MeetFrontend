import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout.tsx";
import LandingPage from "../pages/LandingPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "api/login",
        element: <></>,
      },
      {
        path: "api/register",
        element: <></>,
      },
    ],
  },
]);
