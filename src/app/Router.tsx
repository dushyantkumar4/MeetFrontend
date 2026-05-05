
import { lazy,Suspense } from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './Layout';
import { Navigate } from 'react-router-dom';
import LandingPage from '@/shared/components/LandingPage';
import Login from '@/features/auth/components/Login';


// Lazy load pages — critical for performance
// Each page chunk is only loaded when needed
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const MeetingPage = lazy(() => import('@/features/meeting/pages/MeetingPage'));
const PreJoinPage = lazy(() => import('@/features/meeting/pages/PreJoinPage'));

const router = createBrowserRouter([
  {
    // Public routes (no auth)
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <Login /> },
    ],
  },
  {
    // Protected routes (require Clerk auth)
    path: '/app',
    element: (
      // <ProtectedRoute>
        <Layout />
      // </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/app/dashboard" /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'meeting/prejoin/:roomId', element: <PreJoinPage /> },
    ],
  },
  {
    // Meeting room — fullscreen, no sidebar/nav
    path: '/meeting/:roomId',
    element: (
      
        <Suspense fallback={<LandingPage />}>
          <MeetingPage />
        </Suspense>
    
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}