import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAdminStore from "../../stores/useAdminStore";
import { useFileUpload } from "../../hooks/useFileUpload";
import AdminPage from "../AdminPage";
import FileDrop from "../FileDrop";

function KitForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { kits, addKit, updateKit, error, clearError } = useAdminStore();
  const kit = kits.find((item) => item.id === id);
  const videoUpload = useFileUpload({ types: ["video"], maxMb: 500 });
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState(kit?.images || []);
  const [imagePreviews, setImagePreviews] = useState(kit?.images || []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const readers = files.map(file => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => resolve(ev.target.result);
      reader.readAsDataURL(file);
    }));
    Promise.all(readers).then(results => { setImagePreviews(results); setImages(results); });
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    clearError();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      ...kit, ...data,
      price: Number(data.price), rating: Number(data.rating || 4.8),
      includes: data.includes ? data.includes.split(",").map((item) => item.trim()).filter(Boolean) : [],
      imageUrl: images[0] || kit?.imageUrl || data.imageUrl || "",
      images: images.length > 0 ? images : (kit?.images || []),
      videoUrl: videoUpload.previewUrl || kit?.videoUrl || "",
      videoDuration: videoUpload.duration || kit?.videoDuration || 0
    };
    try {
      if (kit) { await updateKit(kit.id, payload); } else { await addKit(payload); }
      navigate("/admin/kits");
    } catch (err) {
      console.error('Failed to save kit:', err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminPage title={kit ? "Edit Kit" : "Add Kit"}>
      <form className="admin-form" onSubmit={submit}>
        {error && <div style={{ padding: '12px 16px', marginBottom: '16px', backgroundColor: '#fee', border: '1px solid #fcc', borderRadius: '8px', color: '#c00', fontSize: '14px' }}>{error}</div>}
        <input name="name" defaultValue={kit?.name} placeholder="Kit Name*" required />
        <select name="tier" defaultValue={kit?.tier || "STARTER KIT"}>
          <option>STARTER KIT</option>
          <option>PRO KIT</option>
          <option>ELITE KIT</option>
        </select>
        <input name="price" type="number" defaultValue={kit?.price} placeholder="Price (₹)*" required />
        <textarea name="description" defaultValue={kit?.description} placeholder="Description" />
        <input name="includes" defaultValue={kit?.includes?.join(", ")} placeholder="Includes (comma-separated)" />
        <input name="rating" type="number" step=".1" defaultValue={kit?.rating || 4.8} placeholder="Rating" />

        <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#00e5ff' }}>Kit Images (Max 5)</h4>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ padding: '12px', border: '2px dashed rgba(0,229,255,0.3)', borderRadius: '8px', background: 'rgba(0,229,255,0.05)', color: '#fff', cursor: 'pointer', width: '100%' }} />

        {imagePreviews.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px', marginBottom: '1rem', marginTop: '12px' }}>
            {imagePreviews.map((preview, index) => (
              <div key={index} style={{ position: 'relative', aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', border: index === 0 ? '2px solid #00e5ff' : '1px solid rgba(255,255,255,0.2)' }}>
                <img src={preview} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {index === 0 && <span style={{ position: 'absolute', top: '4px', left: '4px', background: '#00e5ff', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: '700' }}>MAIN</span>}
                <button type="button" onClick={() => removeImage(index)} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(255,0,0,0.8)', border: 'none', borderRadius: '4px', color: '#fff', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>×</button>
              </div>
            ))}
          </div>
        )}

        <input name="imageUrl" defaultValue={kit?.imageUrl} placeholder="Or single image URL (fallback)" />

        <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Premium Kit Video (Optional)</h4>
        <FileDrop upload={videoUpload} accept="video/mp4,video/webm,video/quicktime" />

        <button disabled={saving}>{saving ? 'Saving...' : 'Save Kit'}</button>
        <Link to="/admin/kits">Cancel</Link>
      </form>
    </AdminPage>
  );
}

export default KitForm;
