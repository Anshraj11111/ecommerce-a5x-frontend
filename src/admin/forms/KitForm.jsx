import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAdminStore from "../../stores/useAdminStore";
import { useFileUpload } from "../../hooks/useFileUpload";
import AdminPage from "../AdminPage";
import FileDrop from "../FileDrop";

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

function KitForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { kits, addKit, updateKit, error, clearError } = useAdminStore();
  const kit = kits.find((item) => item.id === id);
  const videoUpload = useFileUpload({ types: ["video"], maxMb: 500 });
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState(kit?.images || []);
  const [imagePreviews, setImagePreviews] = useState(kit?.images || []);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    const compressed = await Promise.all(files.map(f => compressImage(f)));
    setImagePreviews(compressed);
    setImages(compressed);
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
      mrp: Number(data.mrp || data.price),
      includes: data.includes ? data.includes.split(",").map((item) => item.trim()).filter(Boolean) : [],
      features: data.features ? data.features.split(",").map((item) => item.trim()).filter(Boolean) : [],
      compatibility: data.compatibility ? data.compatibility.split(",").map((item) => item.trim()).filter(Boolean) : [],
      software: data.software ? data.software.split(",").map((item) => item.trim()).filter(Boolean) : [],
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
        <input name="mrp" type="number" defaultValue={kit?.mrp || kit?.price} placeholder="MRP (₹)* (original price before discount)" required />
        <textarea name="description" defaultValue={kit?.description} placeholder="Description" />
        <textarea name="overview" defaultValue={kit?.overview} placeholder="Detailed Overview (for Overview tab)" />
        <input name="features" defaultValue={kit?.features?.join(", ")} placeholder="Key Features (comma-separated)" />
        <input name="includes" defaultValue={kit?.includes?.join(", ")} placeholder="Includes (comma-separated)" />
        
        <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#00e5ff' }}>Technical Specifications</h4>
        <input name="dimensions" defaultValue={kit?.dimensions} placeholder="Dimensions (e.g., 25cm x 20cm x 15cm)" />
        <input name="weight" defaultValue={kit?.weight} placeholder="Weight (e.g., 1.2 kg)" />
        <input name="power" defaultValue={kit?.power} placeholder="Power Requirements (e.g., 5V DC, 2A)" />
        <input name="temperature" defaultValue={kit?.temperature} placeholder="Operating Temperature (e.g., -10°C to +60°C)" />
        
        <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#00e5ff' }}>Compatibility</h4>
        <input name="compatibility" defaultValue={kit?.compatibility?.join(", ")} placeholder="Compatible Platforms (comma-separated, e.g., Arduino, Raspberry Pi)" />
        <input name="software" defaultValue={kit?.software?.join(", ")} placeholder="Software Requirements (comma-separated)" />
        
        <input name="rating" type="number" step=".1" defaultValue={kit?.rating || 4.8} placeholder="Rating" />

        <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#00e5ff' }}>Kit Images (Max 10)</h4>
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
