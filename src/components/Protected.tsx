import type { ReactNode } from "react";
import { useUser } from "@clerk/react";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
