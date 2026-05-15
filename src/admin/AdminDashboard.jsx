import React from "react";
import { Link } from "react-router-dom";
import useAdminStore from "../stores/useAdminStore";
import AdminPage from "./AdminPage";
import AdminProducts from "./AdminProducts";

function AdminDashboard() {
  const { products, kits, courses } = useAdminStore();
  const stats = [
    ["Total Products", products.length],
    ["Total Kits", kits.length],
    ["Total Courses", courses.length],
    ["Total Videos", courses.reduce((sum, course) => sum + (course.videos?.length || 0), 0)]
  ];
  return (
    <AdminPage title="Dashboard">
      <div className="stat-cards">
        {stats.map(([label, value]) => (
          <article key={label}><strong>{value}</strong><span>{label}</span></article>
        ))}
      </div>
      <div className="quick-actions">
        <Link to="/admin/products/new">+ Add Product</Link>
        <Link to="/admin/kits/new">+ Add Kit</Link>
        <Link to="/admin/courses/new">+ Add Course</Link>
      </div>
      <AdminProducts compact />
    </AdminPage>
  );
}

export default AdminDashboard;
