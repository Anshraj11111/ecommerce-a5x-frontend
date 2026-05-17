import { useRef, useState } from "react";
import { CheckCircle, RefreshCw, Upload, X, FileText } from "lucide-react";
import useAdminStore from "../stores/useAdminStore";
import { uid } from "../config/constants";

function BulkProductUpload() {
  const { bulkUploadProducts } = useAdminStore();
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const products = [];

    // Try numbered format: 1, name, price, qty
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const values = line.split(/,|\t/).map(v => v.trim());
      if (values.length >= 3 && /^\d+$/.test(values[0])) {
        const description = values[1];
        const priceStr = values[2]?.replace(/[₹,\s]/g, '');
        const price = parseFloat(priceStr);
        const qty = values[3] ? parseInt(values[3]) : 10;
        if (description && price > 0) {
          products.push({
            id: uid(), name: description, price, mrp: Math.round(price * 1.4),
            category: 'Sensor', sku: `A5X-${uid().toUpperCase().slice(0, 6)}`,
            shortDescription: description, inStock: true, rating: 4.7,
            stockCount: qty, minQty: 1, reviewCount: 0, quickDelivery: false
          });
        }
      }
    }

    // Try header CSV format
    if (products.length === 0) {
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        let name = '', price = 0, qty = 10;
        for (let j = 0; j < values.length; j++) {
          const val = values[j];
          if (/₹|^\d+\.?\d*$/.test(val)) {
            const p = parseFloat(val.replace(/[₹,\s]/g, ''));
            if (p > 0 && p < 10000) price = p;
          }
          if (val.length > 5 && !/^\d+\.?\d*$/.test(val) && !val.includes('₹')) name = val;
          if (/^\d+$/.test(val)) { const n = parseInt(val); if (n > 0 && n < 1000) qty = n; }
        }
        if (name && price > 0) {
          products.push({
            id: uid(), name, price, mrp: Math.round(price * 1.4),
            category: 'Sensor', sku: `A5X-${uid().toUpperCase().slice(0, 6)}`,
            shortDescription: name, inStock: true, rating: 4.7,
            stockCount: qty, minQty: 1, reviewCount: 0, quickDelivery: false
          });
        }
      }
    }
    return products;
  };

  const processFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setResult(null);
    try {
      const text = await file.text();
      const products = parseCSV(text);
      if (products.length === 0) {
        setResult({ success: false, message: 'No valid products found in file. Check the CSV format.' });
        setUploading(false);
        return;
      }
      const res = await bulkUploadProducts(products);
      setResult({ success: true, message: res.message || `Successfully added ${products.length} products!`, count: products.length });
    } catch (error) {
      setResult({ success: false, message: `Upload failed: ${error.message}` });
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileInput = (e) => processFile(e.target.files?.[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(0,229,255,0.15)",
      borderRadius: "14px",
      padding: "24px",
      marginBottom: "20px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#00e5ff"
        }}>
          <Upload size={18} />
        </div>
        <div>
          <h3 style={{ color: "#00e5ff", margin: 0, fontSize: "16px", fontWeight: "700" }}>Bulk Product Upload</h3>
          <p style={{ color: "#8A9BB5", margin: 0, fontSize: "13px" }}>Upload a CSV file to add multiple products at once</p>
        </div>
      </div>

      {/* CSV Format hint */}
      <div style={{
        background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "12px 14px",
        marginBottom: "16px", border: "1px solid rgba(255,255,255,0.07)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
          <FileText size={14} color="#8A9BB5" />
          <span style={{ color: "#8A9BB5", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>CSV Format</span>
        </div>
        <code style={{ color: "#00e5ff", fontSize: "12px", fontFamily: "monospace" }}>
          name, price, mrp, category, sku, description, instock, rating, stockcount, quickdelivery
        </code>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? "#00e5ff" : "rgba(0,229,255,0.25)"}`,
          borderRadius: "10px",
          padding: "28px",
          textAlign: "center",
          cursor: "pointer",
          background: dragOver ? "rgba(0,229,255,0.05)" : "transparent",
          transition: "all 0.2s"
        }}
      >
        <input ref={fileInputRef} type="file" accept=".csv,.txt" onChange={handleFileInput} disabled={uploading} style={{ display: "none" }} />
        {uploading ? (
          <div style={{ color: "#00e5ff" }}>
            <RefreshCw size={28} style={{ animation: "spin 1s linear infinite", marginBottom: "8px" }} />
            <p style={{ margin: 0, fontSize: "14px" }}>Uploading products…</p>
          </div>
        ) : (
          <>
            <Upload size={28} color={dragOver ? "#00e5ff" : "#8A9BB5"} style={{ marginBottom: "8px" }} />
            <p style={{ color: dragOver ? "#00e5ff" : "#8A9BB5", margin: "0 0 4px", fontSize: "14px", fontWeight: "500" }}>
              Drop CSV file here or click to browse
            </p>
            <p style={{ color: "#6b7280", margin: 0, fontSize: "12px" }}>Supports .csv and .txt files</p>
          </>
        )}
      </div>

      {/* Result */}
      {result && (
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          marginTop: "14px", padding: "12px 16px", borderRadius: "8px",
          background: result.success ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
          border: `1px solid ${result.success ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
          color: result.success ? "#22c55e" : "#ef4444"
        }}>
          {result.success ? <CheckCircle size={18} /> : <X size={18} />}
          <span style={{ fontSize: "14px", fontWeight: "500" }}>{result.message}</span>
        </div>
      )}
    </div>
  );
}

export default BulkProductUpload;
