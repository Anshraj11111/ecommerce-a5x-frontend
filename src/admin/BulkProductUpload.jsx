import React, { useRef, useState } from "react";
import { CheckCircle, RefreshCw, Upload, X } from "lucide-react";
import useAdminStore from "../stores/useAdminStore";
import { uid } from "../config/constants";

function BulkProductUpload() {
  const { bulkUploadProducts } = useAdminStore();
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const products = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const values = line.split(/,|\t/).map(v => v.trim());
      if (values.length >= 3 && /^\d+$/.test(values[0])) {
        const description = values[1];
        const priceStr = values[2]?.replace(/[₹,\s]/g, '');
        const price = parseFloat(priceStr);
        const qty = values[3] ? parseInt(values[3]) : 10;
        if (description && price > 0) {
          products.push({ id: uid(), name: description, price, mrp: Math.round(price * 1.4), category: 'Sensor', sku: `A5X-${uid().toUpperCase().slice(0, 6)}`, shortDescription: description, inStock: true, rating: 4.7, stockCount: qty, minQty: 1, reviewCount: 0, quickDelivery: false });
        }
      }
    }
    if (products.length === 0) {
      const headers = lines[0]?.split(',').map(h => h.trim().toLowerCase()) || [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        let name = '', price = 0, qty = 10;
        for (let j = 0; j < values.length; j++) {
          const val = values[j];
          if (/₹|^\d+\.?\d*$/.test(val)) { const p = parseFloat(val.replace(/[₹,\s]/g, '')); if (p > 0 && p < 10000) price = p; }
          if (val.length > 5 && !/^\d+\.?\d*$/.test(val) && !val.includes('₹')) name = val;
          if (/^\d+$/.test(val)) { const n = parseInt(val); if (n > 0 && n < 1000) qty = n; }
        }
        if (name && price > 0) products.push({ id: uid(), name, price, mrp: Math.round(price * 1.4), category: 'Sensor', sku: `A5X-${uid().toUpperCase().slice(0, 6)}`, shortDescription: name, inStock: true, rating: 4.7, stockCount: qty, minQty: 1, reviewCount: 0, quickDelivery: false });
      }
    }
    return products;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setResult(null);
    try {
      const text = await file.text();
      const products = parseCSV(text);
      if (products.length === 0) { setResult({ success: false, message: 'No valid products found in file' }); setUploading(false); return; }
      const res = await bulkUploadProducts(products);
      setResult({ success: true, message: res.message || `Successfully added ${products.length} products!`, count: products.length });
    } catch (error) {
      setResult({ success: false, message: `Error: ${error.message}` });
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bulk-upload-section">
      <div className="bulk-upload-card">
        <div className="bulk-upload-icon"><Upload size={32} /></div>
        <h3>Bulk Product Upload</h3>
        <p>Upload CSV file with product details to add multiple products at once</p>
        <div className="bulk-upload-format">
          <p><strong>CSV Format:</strong></p>
          <code>name,price,mrp,category,sku,description,instock,rating,stockcount,quickdelivery</code>
        </div>
        <label className="bulk-upload-btn">
          <input ref={fileInputRef} type="file" accept=".csv,.txt" onChange={handleFileUpload} disabled={uploading} style={{ display: 'none' }} />
          {uploading ? <><RefreshCw size={18} className="spin" /> Uploading...</> : <><Upload size={18} /> Choose CSV File</>}
        </label>
        {result && (
          <div className={`bulk-upload-result ${result.success ? 'success' : 'error'}`}>
            {result.success ? <CheckCircle size={20} /> : <X size={20} />}
            <span>{result.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default BulkProductUpload;
