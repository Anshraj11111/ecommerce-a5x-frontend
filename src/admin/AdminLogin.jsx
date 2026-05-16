import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomCursor } from "../components/common/AnimationComponents";
import { API_BASE } from "../config/constants";

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
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
        </form>
      </main>
    </>
  );
}

export default AdminLogin;
