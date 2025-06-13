import { Navigate } from "react-router-dom";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const authenticated = !!localStorage.getItem("authToken");
  console.log("Authenticated?", authenticated);
  if (authenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
 }
}