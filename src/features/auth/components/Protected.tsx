import type { ReactNode } from "react";
import { useUser } from "@clerk/react";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded)
    return (
      <div>
        <ClipLoader color="#e1e2f5" />
      </div>
    );

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
