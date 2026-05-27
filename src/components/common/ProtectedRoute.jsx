import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

// ProtectedRoute — only used for pages that REQUIRE login (e.g. checkout, wishlist)
// Does NOT open a modal — just redirects to /login
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
