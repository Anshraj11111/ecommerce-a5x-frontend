import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Package, Truck, Zap } from "lucide-react";
import useAdminStore from "../../stores/useAdminStore";
import { useFileUpload } from "../../hooks/useFileUpload";
import AdminPage from "../AdminPage";
import { categories } from "../../config/constants";

// Compress image to max 1200px wide, JPEG 80% — keeps base64 payload small
function compressImage(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, error, clearError } = useAdminStore();
  const product = products.find((item) => item.id === id);
  const upload = useFileUpload({ types: ["image"], maxMb: 5 });
  const [deliveryType, setDeliveryType] = useState(product?.quickDelivery === true ? 'quick' : product?.quickDelivery === false ? 'scheduled' : 'all');
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState(product?.images || []);
  const [imagePreviews, setImagePreviews] = useState(product?.images || []);
  const [shortDescription, setShortDescription] = useState(product?.shortDescription || '');

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    const compressed = await Promise.all(files.map(f => compressImage(f)));
    const combined = [...imagePreviews, ...compressed].slice(0, 10);
    setImagePreviews(combined);
    setImages(combined);
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const setAsMain = (index) => {
    setImages(prev => {
      const arr = [...prev];
      const [chosen] = arr.splice(index, 1);
      return [chosen, ...arr];
    });
    setImagePreviews(prev => {
      const arr = [...prev];
      const [chosen] = arr.splice(index, 1);
      return [chosen, ...arr];
    });
  };

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    clearError();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const quickDeliveryValue = data.deliveryType === 'all' ? undefined : data.deliveryType === 'quick';
    const payload = {
      ...product, ...data,
      price: Number(data.price), mrp: Number(data.mrp || data.price),
      minQty: Number(data.minQty || 1), rating: Number(data.rating || 4.7),
      stockCount: Number(data.stockCount || product?.stockCount || 0),
      inStock: data.inStock === "on", quickDelivery: quickDeliveryValue,
      imageUrl: images[0] || product?.imageUrl || upload.previewUrl || "",
      images: images.length > 0 ? images : (product?.images || []),
      features: data.features ? data.features.split(",").map(f => f.trim()).filter(Boolean) : (product?.features || []),
      compatibility: data.compatibility ? data.compatibility.split(",").map(c => c.trim()).filter(Boolean) : (product?.compatibility || []),
      software: data.software ? data.software.split(",").map(s => s.trim()).filter(Boolean) : (product?.software || []),
      tags: data.tags ? data.tags.split(",").map(t => t.trim()).filter(Boolean) : (product?.tags || []),
      shortDescription: shortDescription,
      description: shortDescription,
    };
    try {
      if (product) { await updateProduct(product.id, payload); } else { await addProduct(payload); }
      navigate("/admin/products");
    } catch (err) {
      console.error('Failed to save product:', err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminPage title={product ? "Edit Product" : "Add Product"}>
      <form className="admin-form" onSubmit={submit}>
        {error && <div style={{ padding: '12px 16px', marginBottom: '16px', backgroundColor: '#fee', border: '1px solid #fcc', borderRadius: '8px', color: '#c00', fontSize: '14px' }}>{error}</div>}
        <input name="name" defaultValue={product?.name} placeholder="Product Name*" required />
        <input name="sku" defaultValue={product?.sku || `A5X-${Date.now().toString(36).toUpperCase()}`} placeholder="SKU*" required />
        <select name="category" defaultValue={product?.category || "MicroController"} style={{ background: '#1a2236', color: '#e8e8f0', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', width: '100%', cursor: 'pointer', appearance: 'auto' }}>
          {categories.slice(1).map((category) => <option key={category} style={{ background: '#1a2236', color: '#e8e8f0' }}>{category}</option>)}
        </select>
        <input name="price" type="number" defaultValue={product?.price} placeholder="Price (₹)*" required />
        <input name="mrp" type="number" defaultValue={product?.mrp} placeholder="MRP (₹)*" required />
        <input name="minQty" type="number" defaultValue={product?.minQty || 1} placeholder="Min Quantity" />
        <label><input type="checkbox" name="inStock" defaultChecked={product?.inStock ?? true} /> In Stock</label>

        <div style={{ marginTop: '16px', marginBottom: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: '10px', padding: '16px' }}>
          <p style={{ marginBottom: '12px', fontWeight: 600, color: '#00e5ff', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delivery Type:</p>
          {[
            { value: 'all', icon: <Package size={16} />, label: 'All (Show in both filters)' },
            { value: 'quick', icon: <Zap size={16} />, label: 'Quick Delivery (1 Day)' },
            { value: 'scheduled', icon: <Truck size={16} />, label: 'Scheduled Delivery (1 Week)' },
          ].map(({ value, icon, label }) => (
            <label key={value} onClick={() => setDeliveryType(value)} style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px',
              cursor: 'pointer', padding: '10px 12px', borderRadius: '8px',
              background: deliveryType === value ? 'rgba(0,229,255,0.1)' : 'transparent',
              border: deliveryType === value ? '1px solid rgba(0,229,255,0.3)' : '1px solid transparent',
              transition: 'all 0.2s'
            }}>
              <div style={{
                width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                border: deliveryType === value ? '2px solid #00e5ff' : '2px solid #4a5568',
                background: deliveryType === value ? '#00e5ff' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {deliveryType === value && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#000' }} />}
              </div>
              <input type="radio" name="deliveryType" value={value} checked={deliveryType === value} onChange={() => setDeliveryType(value)} style={{ display: 'none' }} />
              <span style={{ color: '#718096' }}>{icon}</span>
              <span style={{ color: deliveryType === value ? '#e8e8f0' : '#8A9BB5', fontSize: '14px' }}>{label}</span>
            </label>
          ))}
        </div>

        <textarea 
          name="description" 
          value={shortDescription}
          onChange={e => setShortDescription(e.target.value)}
          placeholder="Short Description" 
        />
        <textarea name="overview" defaultValue={product?.overview} placeholder="Detailed Overview (for Overview tab)" />
        <input name="features" defaultValue={product?.features?.join(", ")} placeholder="Key Features (comma-separated)" />

        <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: '#00e5ff' }}>Technical Specifications</h4>
        <input name="dimensions" defaultValue={product?.dimensions} placeholder="Dimensions (e.g., 5cm x 3cm x 1cm)" />
        <input name="weight" defaultValue={product?.weight} placeholder="Weight (e.g., 25g)" />
        <input name="power" defaultValue={product?.power} placeholder="Power (e.g., 5V DC, 500mA)" />
        <input name="temperature" defaultValue={product?.temperature} placeholder="Operating Temp (e.g., -10°C to +60°C)" />

        <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: '#00e5ff' }}>Compatibility</h4>
        <input name="compatibility" defaultValue={product?.compatibility?.join(", ")} placeholder="Compatible platforms (comma-separated, e.g., Arduino, ESP32)" />
        <input name="software" defaultValue={product?.software?.join(", ")} placeholder="Software requirements (comma-separated)" />

        <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#00e5ff' }}>Product Images (Max 10)</h4>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ padding: '12px', border: '2px dashed rgba(0,229,255,0.3)', borderRadius: '8px', background: 'rgba(0,229,255,0.05)', color: '#fff', cursor: 'pointer', width: '100%' }} />

        {imagePreviews.length > 0 && (
          <div style={{ marginBottom: '1rem', marginTop: '12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
              ⭐ Click an image to set it as the <strong style={{color:'#00e5ff'}}>main cover image</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  onClick={() => setAsMain(index)}
                  title={index === 0 ? 'This is the main image' : 'Click to set as main image'}
                  style={{
                    position: 'relative', aspectRatio: '1', borderRadius: '8px', overflow: 'hidden',
                    border: index === 0 ? '2px solid #00e5ff' : '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer', transition: 'border-color 0.2s',
                    boxShadow: index === 0 ? '0 0 12px rgba(0,229,255,0.4)' : 'none'
                  }}
                >
                  <img src={preview} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {index === 0 && (
                    <span style={{ position: 'absolute', top: '4px', left: '4px', background: '#00e5ff', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '800' }}>
                      ⭐ MAIN
                    </span>
                  )}
                  {index !== 0 && (
                    <div
                      style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s', fontSize: '11px', color: '#fff', fontWeight: '700' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = 1}
                      onMouseLeave={e => e.currentTarget.style.opacity = 0}
                    >
                      Set as Main
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                    style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(255,0,0,0.85)', border: 'none', borderRadius: '4px', color: '#fff', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px', fontWeight: '700' }}
                  >×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <input name="tags" defaultValue={product?.tags?.join(", ")} placeholder="Tags, comma-separated" />
        <input name="rating" type="number" step=".1" defaultValue={product?.rating || 4.7} placeholder="Rating (1-5)" />
        <button disabled={saving}>{saving ? 'Saving...' : 'Save Product'}</button>
        <Link to="/admin/products">Cancel</Link>
      </form>
    </AdminPage>
  );
}

export default ProductForm;
