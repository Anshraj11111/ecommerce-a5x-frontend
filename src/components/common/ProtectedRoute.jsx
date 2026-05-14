import React from "react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import useAuthModalStore from "../../stores/useAuthModalStore";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const { open } = useAuthModalStore();
  const location = useLocation();

  if (!isAuthenticated) {
    open(location.pathname);
    return null;
  }

  return children;
}

export default ProtectedRoute;
