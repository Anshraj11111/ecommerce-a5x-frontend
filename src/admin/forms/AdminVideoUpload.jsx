import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAdminStore from "../../stores/useAdminStore";
import AdminPage from "../AdminPage";

function AdminVideoUpload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addVideo = useAdminStore((state) => state.addVideo);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeId, setYoutubeId] = useState('');

  function extractYoutubeId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return '';
  }

  function handleYoutubeChange(e) {
    const url = e.target.value;
    setYoutubeUrl(url);
    const ytId = extractYoutubeId(url);
    setYoutubeId(ytId);
    if (ytId && !thumbnailPreview) setThumbnailPreview(`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
  }

  function handleThumbnailChange(e) {
    const file = e.target.files?.[0];
    if (file) setThumbnailPreview(URL.createObjectURL(file));
  }

  function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const ytId = extractYoutubeId(youtubeUrl || data.videoUrl || '');
    const embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : (data.videoUrl || '');
    const autoThumb = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '';
    addVideo(id, {
      ...data,
      videoUrl: embedUrl || data.videoUrl || '',
      youtubeId: ytId,
      thumbnailUrl: thumbnailPreview || autoThumb,
      duration: Number(data.duration || 300),
      relatedProducts: data.relatedProducts ? data.relatedProducts.split(",").map((item) => item.trim()).filter(Boolean) : [],
      publishedAt: new Date().toISOString().slice(0, 10)
    });
    navigate(`/admin/courses/${id}`);
  }

  return (
    <AdminPage title="Add Video to Course">
      <form className="admin-form" onSubmit={submit}>
        <div className="admin-form-group">
          <label className="admin-label">Video Title *</label>
          <input name="title" placeholder="e.g. Introduction to Motors" required />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Description</label>
          <textarea name="description" placeholder="What will students learn in this video?" rows={3} />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">🎬 YouTube Video URL *</label>
          <input name="videoUrl" placeholder="https://www.youtube.com/watch?v=..." value={youtubeUrl} onChange={handleYoutubeChange} />
          {youtubeId && (
            <div style={{ marginTop: '12px', borderRadius: '10px', overflow: 'hidden', maxWidth: '400px' }}>
              <img src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`} alt="YouTube thumbnail" style={{ width: '100%', borderRadius: '10px' }} />
              <p style={{ color: '#10b981', fontSize: '13px', marginTop: '6px' }}>✅ YouTube video detected! ID: {youtubeId}</p>
            </div>
          )}
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Custom Thumbnail (Optional)</label>
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Duration (seconds)</label>
            <input name="duration" type="number" placeholder="e.g. 600 (10 min)" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Related Product IDs</label>
            <input name="relatedProducts" placeholder="esp32, l298n (comma separated)" />
          </div>
        </div>
        <button type="submit" className="admin-save-btn">Save Video</button>
      </form>
    </AdminPage>
  );
}

export default AdminVideoUpload;
