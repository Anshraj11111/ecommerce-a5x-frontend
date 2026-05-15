import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AdminAuthGuard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("a5x-admin-token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) return null;
  return <Outlet />;
}

export default AdminAuthGuard;
