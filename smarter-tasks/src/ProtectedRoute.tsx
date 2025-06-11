import { Navigate } from "react-router-dom";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const authenticated = localStorage.getItem("authenticated");
  if (authenticated === 'true') {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
 }
}