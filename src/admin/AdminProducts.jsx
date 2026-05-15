import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, RefreshCw, Trash2, Upload } from "lucide-react";
import useAdminStore from "../stores/useAdminStore";
import AdminPage from "./AdminPage";
import BulkProductUpload from "./BulkProductUpload";
import { inr } from "../config/constants";
import motorDriver from "../assets/motor-driver.jpg";

function AdminProducts({ compact }) {
  const { products, deleteProduct, loadProducts, productsLoaded } = useAdminStore();
  const [query, setQuery] = useState("");
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const filtered = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => { loadProducts(); }, []);

  return (
    <AdminPage title={compact ? "Recently Added Products" : "Products"}>
      {!compact && (
        <>
          <div className="admin-tools">
            <input placeholder="Search products" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={() => setShowBulkUpload(!showBulkUpload)}>
              <Upload size={16} /> {showBulkUpload ? 'Hide' : 'Bulk Upload'}
            </button>
            <Link to="/admin/products/new">+ Add New Product</Link>
            <button onClick={() => loadProducts()} title="Refresh products from database">
              <RefreshCw size={16} /> Refresh
            </button>
          </div>
          {showBulkUpload && <BulkProductUpload />}
        </>
      )}
      <table>
        <tbody>
          {filtered.slice(0, compact ? 5 : filtered.length).map((product) => (
            <tr key={product.id}>
              <td><img src={product.imageUrl || motorDriver} alt="" /></td>
              <td>{product.name}<small>{product.sku}</small></td>
              <td>{product.category}</td>
              <td>{inr(Number(product.price))}</td>
              <td>{product.inStock ? "In Stock" : "Out"}</td>
              <td>
                <Link to={`/admin/products/${product.id}`}><Pencil size={16} /></Link>
                <button onClick={() => confirm("Delete product?") && deleteProduct(product.id)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminPage>
  );
}

export default AdminProducts;
