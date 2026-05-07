import { useAuth as useClerkAuth, useUser } from '@clerk/react';
import { useCallback } from 'react';
import { initSocket, disconnectSocket } from '@/lib/socket/socket.client';
import { setupAxiosInterceptors } from '@/lib/http/axios.client';

export function useAuth() {
  const { isLoaded, isSignedIn, signOut, getToken } = useClerkAuth();
  const { user } = useUser();

  // Initialize all auth-dependent services at once
  const initServices = useCallback(async () => {
    const token = await getToken();
    if (token) {
      initSocket(token);
      setupAxiosInterceptors(getToken);
    }
  }, [getToken]);

  const handleSignOut = useCallback(async () => {
    disconnectSocket();
    await signOut();
  }, [signOut]);

  return {
    isLoaded,
    isSignedIn,
    user,
    getToken,
    initServices,
    signOut: handleSignOut,
  };
}