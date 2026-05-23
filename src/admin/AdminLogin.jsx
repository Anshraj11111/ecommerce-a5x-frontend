import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CustomCursor } from "../components/common/AnimationComponents";
import { API_BASE } from "../config/constants";

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lockUntil, setLockUntil] = useState(null); // timestamp when lock expires
  const [countdown, setCountdown] = useState(0);    // seconds remaining
  const timerRef = useRef(null);

  // Clear stale tokens on load
  useEffect(() => {
    localStorage.removeItem("a5x-admin-token");
    localStorage.removeItem("a5x-admin-user");
  }, []);

  // Countdown ticker
  useEffect(() => {
    if (!lockUntil) return;

    const tick = () => {
      const remaining = Math.ceil((lockUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockUntil(null);
        setCountdown(0);
        setError("");
        clearInterval(timerRef.current);
      } else {
        setCountdown(remaining);
      }
    };

    tick(); // run immediately
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
  }, [lockUntil]);

  const isLocked = lockUntil && Date.now() < lockUntil;

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  async function submit(event) {
    event.preventDefault();
    if (isLocked) return;

    setError("");
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
        // Account locked — start countdown
        const until = result.lockUntil ? new Date(result.lockUntil).getTime() : Date.now() + 5 * 60 * 1000;
        setLockUntil(until);
        setError(result.error || "Account locked. Try again in 5 minutes.");
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
    } catch {
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
          <input name="email" type="email" placeholder="Email" required disabled={loading || isLocked} />
          <input name="password" type="password" placeholder="Password" required disabled={loading || isLocked} />
          <button disabled={loading || isLocked}>
            {loading ? "Logging in..." : isLocked ? `Locked — ${formatCountdown(countdown)}` : "Login"}
          </button>
          {error && (
            <p className="error-message" style={{ color: isLocked ? '#f59e0b' : 'red', marginTop: '1rem' }}>
              {isLocked ? `🔒 ${error} Try again in ${formatCountdown(countdown)}.` : error}
            </p>
          )}
        </form>
      </main>
    </>
  );
}

export default AdminLogin;
