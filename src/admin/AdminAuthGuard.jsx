import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { API_BASE } from "../config/constants";

function AdminAuthGuard() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("a5x-admin-token");
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    // Verify token is valid and has admin role
    fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user && data.user.role === "admin") {
          setValid(true);
        } else {
          // Token exists but not admin - clear and redirect
          localStorage.removeItem("a5x-admin-token");
          localStorage.removeItem("a5x-admin-user");
          navigate("/admin/login", { replace: true });
        }
      })
      .catch(() => {
        // Network error - still allow if token exists
        setValid(true);
      })
      .finally(() => setChecking(false));
  }, [navigate]);

  if (checking) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#06090f",
        color: "#00e5ff",
        fontFamily: "Orbitron, sans-serif",
        fontSize: "18px"
      }}>
        Verifying admin access...
      </div>
    );
  }

  if (!valid) return null;
  return <Outlet />;
}

export default AdminAuthGuard;
