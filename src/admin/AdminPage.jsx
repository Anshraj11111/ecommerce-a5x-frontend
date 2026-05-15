import React from "react";

function AdminPage({ title, children }) {
  return (
    <section className="admin-page">
      <p>Admin / {title}</p>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

export default AdminPage;
