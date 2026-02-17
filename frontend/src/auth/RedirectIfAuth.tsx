import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { type ReactNode } from "react";

export function RedirectIfAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
