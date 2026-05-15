import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Pencil, PlayCircle, RefreshCw, Trash2 } from "lucide-react";
import useAdminStore from "../stores/useAdminStore";
import AdminPage from "./AdminPage";
import { inr } from "../config/constants";
import a5xCarKit from "../assets/a5x-car-kit.jpg";

function AdminKits() {
  const { kits, deleteKit, loadKits } = useAdminStore();

  useEffect(() => { loadKits(); }, []);

  return (
    <AdminPage title="Kits">
      <div className="admin-tools">
        <Link to="/admin/kits/new">+ Add New Kit</Link>
        <button onClick={() => loadKits()} title="Refresh kits from database"><RefreshCw size={16} /> Refresh</button>
      </div>
      <table>
        <thead>
          <tr><th>Image</th><th>Name</th><th>Price</th><th>Items</th><th>Video</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {kits.map((kit) => (
            <tr key={kit.id}>
              <td><img src={kit.imageUrl || a5xCarKit} alt="" /></td>
              <td>{kit.name}<small>{kit.tier}</small></td>
              <td>{inr(Number(kit.price))}</td>
              <td>{kit.includes?.length || 0} items</td>
              <td>
                {kit.videoUrl
                  ? <span style={{ color: '#0f0', display: 'flex', alignItems: 'center', gap: '4px' }}><PlayCircle size={14} /> Yes</span>
                  : <span style={{ opacity: 0.5 }}>No</span>}
              </td>
              <td>
                <Link to={`/admin/kits/${kit.id}`}><Pencil size={16} /></Link>
                <button onClick={() => confirm("Delete kit?") && deleteKit(kit.id)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminPage>
  );
}

export default AdminKits;
