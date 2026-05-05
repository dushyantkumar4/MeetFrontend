import { useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { attachTokenInterceptor } from "@/lib/http/axios.client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function AuthInterceptor({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();

  useEffect(() => {
    attachTokenInterceptor(getToken);
  }, [getToken]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <AuthInterceptor>
        <QueryClientProvider client={queryClient}>
          {children}
          {import.meta.env.DEV && <ReactQueryDevtools />}
        </QueryClientProvider>
      </AuthInterceptor>
    </ClerkProvider>
  );
}
