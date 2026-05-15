import React, { useState } from "react";
import AdminPage from "./AdminPage";

function AdminSettings() {
  const [upiId, setUpiId] = useState(() => localStorage.getItem('a5x-upi-id') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('a5x-upi-id', upiId.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const previewQr = upiId.trim()
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=${upiId.trim()}&pn=A5X+Robotics&cu=INR`)}`
    : '';

  return (
    <AdminPage title="Settings">
      <form className="admin-form" onSubmit={handleSave}>
        <input placeholder="Site name" defaultValue="A5X Robotics" />
        <input placeholder="Tagline" defaultValue="Build the Future" />
        <input placeholder="Contact email" defaultValue="support@a5x.in" />
        <input placeholder="Phone" />
        <textarea placeholder="Address" />
        <input placeholder="Meta title" />
        <textarea placeholder="SEO description" />

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 24, paddingTop: 24 }}>
          <h3 style={{ marginBottom: 12, color: '#00ff88', fontSize: 16 }}>💳 UPI Payment Settings</h3>
          <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 12 }}>
            Enter your UPI ID. Customers who select "Online Payment" at checkout will see a QR code to scan.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <input
                type="text"
                placeholder="yourname@upi (e.g. ansh@paytm)"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                style={{ width: '100%' }}
              />
              <p style={{ fontSize: 12, opacity: 0.5, marginTop: 6 }}>
                Supports: @paytm, @gpay, @phonepe, @ybl, @okaxis, etc.
              </p>
            </div>
            {previewQr && (
              <div style={{ textAlign: 'center' }}>
                <img src={previewQr} alt="UPI QR Preview" style={{ borderRadius: 8, border: '2px solid rgba(0,255,136,0.3)', display: 'block' }} />
                <p style={{ fontSize: 11, opacity: 0.5, marginTop: 6 }}>QR Preview</p>
              </div>
            )}
          </div>
        </div>

        <button type="submit" style={{ marginTop: 16 }}>
          {saved ? '✅ Saved!' : 'Save Settings'}
        </button>
      </form>
    </AdminPage>
  );
}

export default AdminSettings;
