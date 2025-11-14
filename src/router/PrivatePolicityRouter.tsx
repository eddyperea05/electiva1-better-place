import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../firebase/hooks/useAuth";
import { LoadingModal } from "../ui/modals/LoadingModal";

export const PrivatePolicityRouter = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <LoadingModal/>
    );
  }

  return user ? children : <Navigate to="/" replace />;
};
