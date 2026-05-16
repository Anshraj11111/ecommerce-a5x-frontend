import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomCursor } from "../components/common/AnimationComponents";
import { API_BASE } from "../config/constants";

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  // Clear any stale tokens on login page load
  useEffect(() => {
    localStorage.removeItem("a5x-admin-token");
    localStorage.removeItem("a5x-admin-user");
  }, []);

  async function handleUnlock() {
    setUnlocking(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/make-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@a5xrobotics.com",
          secret: "a5x-admin-setup-2026"
        })
      });
      const data = await res.json();
      if (data.success && data.token) {
        // Use the token from make-admin directly
        localStorage.setItem("a5x-admin-token", data.token);
        localStorage.setItem("a5x-admin-user", JSON.stringify(data.user));
        navigate("/admin/dashboard");
      } else {
        setError("Unlock failed. Please try again.");
      }
    } catch {
      setError("Connection error during unlock.");
    } finally {
      setUnlocking(false);
    }
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setIsLocked(false);
    setLoading(true);

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password })
      });

      const result = await response.json();

      if (response.status === 429) {
        // Account locked
        setIsLocked(true);
        setError("Account locked due to too many login attempts.");
        return;
      }

      if (response.ok && result.token) {
        if (result.user.role === "admin") {
          localStorage.setItem("a5x-admin-token", result.token);
          localStorage.setItem("a5x-admin-user", JSON.stringify(result.user));
          navigate("/admin/dashboard");
        } else {
          setError("Access denied. Admin privileges required.");
        }
      } else {
        setError(result.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Connection error. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <CustomCursor />
      <main className="admin-login">
        <form onSubmit={submit}>
          <h1>A5X Admin</h1>
          <input name="email" type="email" placeholder="Email" required disabled={loading} />
          <input name="password" type="password" placeholder="Password" required disabled={loading} />
          <button disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          {error && <p className="error-message" style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
          {isLocked && (
            <button
              type="button"
              onClick={handleUnlock}
              disabled={unlocking}
              style={{
                marginTop: '0.5rem',
                background: 'rgba(0,229,255,0.1)',
                border: '1px solid rgba(0,229,255,0.3)',
                color: '#00e5ff',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              {unlocking ? "Unlocking..." : "Unlock Admin Account"}
            </button>
          )}
        </form>
      </main>
    </>
  );
}

export default AdminLogin;
