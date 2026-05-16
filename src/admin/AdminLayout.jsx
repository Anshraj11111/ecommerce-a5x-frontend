import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Layers, LogOut, MessageSquare, Package, PlayCircle, Settings, ShoppingCart, Star } from "lucide-react";
import { CustomCursor } from "../components/common/AnimationComponents";

function AdminLayout() {
  const navigate = useNavigate();
  const items = [
    [LayoutDashboard, "Dashboard", "/admin/dashboard"],
    [Package, "Products", "/admin/products"],
    [Layers, "Kits", "/admin/kits"],
    [PlayCircle, "Courses & Videos", "/admin/courses"],
    [ShoppingCart, "Orders", "/admin/orders"],
    [Star, "Reviews", "/admin/reviews"],
    [MessageSquare, "Contacts", "/admin/contacts"],
    [Settings, "Settings", "/admin/settings"]
  ];
  return (
    <>
      <CustomCursor />
      <div className="admin-shell">
        <aside>
          <Link className="logo" to="/"><span>A5X</span><small>ADMIN PANEL</small></Link>
          {items.map(([Icon, label, to]) => (
            <NavLink key={to} to={to}><Icon size={18} />{label}</NavLink>
          ))}
          <button onClick={() => { localStorage.removeItem("a5x-admin-token"); navigate("/admin/login"); }}>
            <LogOut size={18} />Logout
          </button>
        </aside>
        <main><Outlet /></main>
      </div>
    </>
  );
}

export default AdminLayout;
