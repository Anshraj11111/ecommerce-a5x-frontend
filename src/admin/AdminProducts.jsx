import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, RefreshCw, Trash2, Upload, CheckSquare, Square, AlertTriangle } from "lucide-react";
import useAdminStore from "../stores/useAdminStore";
import AdminPage from "./AdminPage";
import BulkProductUpload from "./BulkProductUpload";
import { inr } from "../config/constants";
import motorDriver from "../assets/motor-driver.jpg";

function AdminProducts({ compact }) {
  const { products, deleteProduct, loadProducts } = useAdminStore();
  const [query, setQuery] = useState("");
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [deleting, setDeleting] = useState(false);
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    (p.sku || "").toLowerCase().includes(query.toLowerCase()) ||
    (p.category || "").toLowerCase().includes(query.toLowerCase())
  );

  const displayList = compact ? filtered.slice(0, 5) : filtered;

  useEffect(() => { loadProducts(); }, []);

  // Selection helpers
  const allSelected = displayList.length > 0 && displayList.every((p) => selected.has(p.id));
  const someSelected = selected.size > 0;

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(displayList.map((p) => p.id)));
    }
  };

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    setDeleting(true);
    setConfirmBulkDelete(false);
    try {
      await Promise.all([...selected].map((id) => deleteProduct(id)));
      setSelected(new Set());
    } catch (err) {
      console.error("Bulk delete failed:", err);
    }
    setDeleting(false);
  };

  const handleSingleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    setSelected((prev) => { const next = new Set(prev); next.delete(id); return next; });
  };

  return (
    <AdminPage title={compact ? "Recently Added Products" : "Products"}>
      {!compact && (
        <>
          {/* Toolbar */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginBottom: "16px" }}>
            <input
              placeholder="Search by name, SKU, category…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: "1", minWidth: "200px", padding: "9px 14px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px", color: "#e8e8f0", fontSize: "14px", outline: "none"
              }}
            />
            <button
              onClick={() => setShowBulkUpload(!showBulkUpload)}
              style={toolBtn(showBulkUpload ? "#00e5ff" : null)}
            >
              <Upload size={15} /> {showBulkUpload ? "Hide Upload" : "Bulk Upload"}
            </button>
            <Link to="/admin/products/new" style={toolBtn("#00e5ff", true)}>
              + Add Product
            </Link>
            <button onClick={() => loadProducts()} style={toolBtn()} title="Refresh">
              <RefreshCw size={15} /> Refresh
            </button>
          </div>

          {/* Bulk Upload Panel */}
          {showBulkUpload && <BulkProductUpload />}

          {/* Bulk Action Bar — appears when items selected */}
          {someSelected && (
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "10px 16px", marginBottom: "12px",
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "10px"
            }}>
              <span style={{ color: "#ef4444", fontWeight: "600", fontSize: "14px" }}>
                {selected.size} product{selected.size > 1 ? "s" : ""} selected
              </span>
              <button
                onClick={() => setConfirmBulkDelete(true)}
                disabled={deleting}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "7px 14px", background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.5)", borderRadius: "7px",
                  color: "#ef4444", cursor: "pointer", fontSize: "13px", fontWeight: "600"
                }}
              >
                <Trash2 size={14} /> {deleting ? "Deleting…" : "Delete Selected"}
              </button>
              <button
                onClick={() => setSelected(new Set())}
                style={{
                  padding: "7px 12px", background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)", borderRadius: "7px",
                  color: "#8A9BB5", cursor: "pointer", fontSize: "13px"
                }}
              >
                Clear Selection
              </button>
            </div>
          )}

          {/* Confirm Dialog */}
          {confirmBulkDelete && (
            <div style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
            }}>
              <div style={{
                background: "#0f1520", border: "1px solid rgba(239,68,68,0.4)",
                borderRadius: "14px", padding: "28px 32px", maxWidth: "400px", width: "90%",
                textAlign: "center"
              }}>
                <AlertTriangle size={40} color="#ef4444" style={{ marginBottom: "12px" }} />
                <h3 style={{ color: "#fff", marginBottom: "8px" }}>Delete {selected.size} Products?</h3>
                <p style={{ color: "#8A9BB5", marginBottom: "24px", fontSize: "14px" }}>
                  This action cannot be undone. All selected products will be permanently removed.
                </p>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                  <button
                    onClick={() => setConfirmBulkDelete(false)}
                    style={{
                      padding: "10px 20px", background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px",
                      color: "#e8e8f0", cursor: "pointer", fontWeight: "500"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    style={{
                      padding: "10px 20px", background: "#ef4444",
                      border: "none", borderRadius: "8px",
                      color: "#fff", cursor: "pointer", fontWeight: "600"
                    }}
                  >
                    Yes, Delete All
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Stats row */}
      {!compact && (
        <div style={{ color: "#8A9BB5", fontSize: "13px", marginBottom: "10px" }}>
          Showing {displayList.length} of {products.length} products
          {query && ` · filtered by "${query}"`}
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {!compact && (
                <th style={thStyle}>
                  <button onClick={toggleAll} style={{ background: "none", border: "none", cursor: "pointer", color: allSelected ? "#00e5ff" : "#8A9BB5", display: "flex", alignItems: "center" }}>
                    {allSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                  </button>
                </th>
              )}
              <th style={thStyle}></th>
              <th style={{ ...thStyle, textAlign: "left" }}>Product</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayList.map((product) => {
              const isSelected = selected.has(product.id);
              return (
                <tr
                  key={product.id}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    background: isSelected ? "rgba(0,229,255,0.05)" : "transparent",
                    transition: "background 0.15s"
                  }}
                >
                  {!compact && (
                    <td style={tdStyle}>
                      <button onClick={() => toggleOne(product.id)} style={{ background: "none", border: "none", cursor: "pointer", color: isSelected ? "#00e5ff" : "#8A9BB5", display: "flex", alignItems: "center" }}>
                        {isSelected ? <CheckSquare size={17} /> : <Square size={17} />}
                      </button>
                    </td>
                  )}
                  <td style={tdStyle}>
                    <img
                      src={product.imageUrl || motorDriver}
                      alt=""
                      style={{ width: "44px", height: "44px", objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                  </td>
                  <td style={{ ...tdStyle, textAlign: "left" }}>
                    <div style={{ fontWeight: "500", color: "#e8e8f0", fontSize: "14px", marginBottom: "2px" }}>{product.name}</div>
                    <div style={{ color: "#8A9BB5", fontSize: "12px" }}>{product.sku}</div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: "500",
                      background: "rgba(0,229,255,0.08)", color: "#00e5ff", border: "1px solid rgba(0,229,255,0.2)"
                    }}>
                      {product.category}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, fontWeight: "700", color: "#00e5ff", fontFamily: "monospace" }}>
                    {inr(Number(product.price))}
                  </td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: "500",
                      background: product.inStock ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                      color: product.inStock ? "#22c55e" : "#ef4444",
                      border: `1px solid ${product.inStock ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`
                    }}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                      <Link
                        to={`/admin/products/${product.id}`}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: "32px", height: "32px", borderRadius: "7px",
                          background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.25)",
                          color: "#00e5ff", textDecoration: "none"
                        }}
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        onClick={() => handleSingleDelete(product.id)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: "32px", height: "32px", borderRadius: "7px",
                          background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
                          color: "#ef4444", cursor: "pointer"
                        }}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {displayList.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#8A9BB5" }}>
            {query ? `No products match "${query}"` : "No products found"}
          </div>
        )}
      </div>
    </AdminPage>
  );
}

// Style helpers
const thStyle = {
  padding: "10px 12px", color: "#8A9BB5", fontSize: "12px",
  fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em",
  textAlign: "center", whiteSpace: "nowrap"
};

const tdStyle = {
  padding: "10px 12px", textAlign: "center", verticalAlign: "middle"
};

function toolBtn(activeColor, isLink) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: "6px",
    padding: "8px 14px", borderRadius: "8px", fontSize: "13px",
    fontWeight: "500", cursor: "pointer", textDecoration: "none",
    whiteSpace: "nowrap", transition: "all 0.15s"
  };
  if (activeColor === "#00e5ff" && isLink) {
    return { ...base, background: "#00e5ff", color: "#000", border: "none" };
  }
  if (activeColor === "#00e5ff") {
    return { ...base, background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.3)", color: "#00e5ff" };
  }
  return { ...base, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#8A9BB5" };
}

export default AdminProducts;
