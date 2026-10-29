import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Lock, Save, Edit2, Check, X } from "lucide-react";
import { API_BASE } from "../config/constants";
import useAuthStore from "../stores/useAuthStore";

function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          pincode: user.address?.pincode || '',
          landmark: user.address?.landmark || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setEditing(false);
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } else {
        setMessage({ text: data.error || 'Failed to update profile', type: 'error' });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ text: 'Failed to update profile. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    // Reset form to current user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          pincode: user.address?.pincode || '',
          landmark: user.address?.landmark || ''
        }
      });
    }
    setEditing(false);
    setMessage({ text: '', type: '' });
  };

  return (
    <main className="profile-page" style={{ maxWidth: 800, margin: '0 auto', padding: '120px 20px 60px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Header */}
        <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <User size={32} color="#00ff88" />
              My Profile
            </h1>
            <p style={{ opacity: 0.6, fontSize: 16 }}>Manage your account information</p>
          </div>
          {!editing && (
            <button 
              className="btn"
              onClick={() => setEditing(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Edit2 size={16} />
              Edit Profile
            </button>
          )}
        </div>

        {/* Message Alert */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: message.type === 'success' ? 'rgba(0,255,136,0.1)' : 'rgba(239,68,68,0.1)',
              border: `1px solid ${message.type === 'success' ? 'rgba(0,255,136,0.3)' : 'rgba(239,68,68,0.3)'}`,
              color: message.type === 'success' ? '#00ff88' : '#ef4444',
              padding: '12px 16px',
              borderRadius: 12,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 500
            }}
          >
            {message.type === 'success' ? <Check size={16} /> : <X size={16} />}
            {message.text}
          </motion.div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="glass-card" style={{ 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: 16, 
            padding: 28,
            marginBottom: 24
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <User size={18} />
              Personal Information
            </h3>
            <div style={{ display: 'grid', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                    style={{ 
                      width: '100%',
                      padding: '12px 16px 12px 44px',
                      background: editing ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      color: 'inherit',
                      fontSize: 14,
                      opacity: editing ? 1 : 0.7,
                      cursor: editing ? 'text' : 'not-allowed'
                    }}
                  />
                  <span style={{ 
                    position: 'absolute', 
                    left: 16, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    fontSize: 18,
                    pointerEvents: 'none'
                  }}>👤</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={true}
                    style={{ 
                      width: '100%',
                      padding: '12px 16px 12px 44px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      color: 'inherit',
                      fontSize: 14,
                      opacity: 0.7, 
                      cursor: 'not-allowed'
                    }}
                  />
                  <span style={{ 
                    position: 'absolute', 
                    left: 16, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    fontSize: 18,
                    pointerEvents: 'none'
                  }}>📧</span>
                </div>
                <p style={{ fontSize: 12, opacity: 0.5, marginTop: 6 }}>
                  Email cannot be changed for security reasons
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
                  Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    maxLength={10}
                    pattern="\d{10}"
                    inputMode="numeric"
                    placeholder="10-digit phone number"
                    style={{ 
                      width: '100%',
                      padding: '12px 16px 12px 44px',
                      background: editing ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      color: 'inherit',
                      fontSize: 14,
                      opacity: editing ? 1 : 0.7,
                      cursor: editing ? 'text' : 'not-allowed'
                    }}
                  />
                  <span style={{ 
                    position: 'absolute', 
                    left: 16, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    fontSize: 18,
                    pointerEvents: 'none'
                  }}>📱</span>
                </div>
              </div>
            </div>
          </div>

          {/* Default Address */}
          <div className="glass-card" style={{ 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: 16, 
            padding: 28,
            marginBottom: 24
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={18} />
              Default Shipping Address
            </h3>
            <div style={{ display: 'grid', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
                  Street Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    disabled={!editing}
                    style={{ 
                      width: '100%',
                      padding: '12px 16px 12px 44px',
                      background: editing ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      color: 'inherit',
                      fontSize: 14,
                      opacity: editing ? 1 : 0.7,
                      cursor: editing ? 'text' : 'not-allowed'
                    }}
                  />
                  <span style={{ 
                    position: 'absolute', 
                    left: 16, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    fontSize: 18,
                    pointerEvents: 'none'
                  }}>🏠</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
                    City
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      disabled={!editing}
                      style={{ 
                        width: '100%',
                        padding: '12px 16px 12px 44px',
                        background: editing ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        color: 'inherit',
                        fontSize: 14,
                        opacity: editing ? 1 : 0.7,
                        cursor: editing ? 'text' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      position: 'absolute', 
                      left: 16, 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      fontSize: 18,
                      pointerEvents: 'none'
                    }}>🏙️</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
                    State
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      disabled={!editing}
                      style={{ 
                        width: '100%',
                        padding: '12px 16px 12px 44px',
                        background: editing ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        color: 'inherit',
                        fontSize: 14,
                        opacity: editing ? 1 : 0.7,
                        cursor: editing ? 'text' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      position: 'absolute', 
                      left: 16, 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      fontSize: 18,
                      pointerEvents: 'none'
                    }}>📍</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
                    Pincode
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleChange}
                      disabled={!editing}
                      maxLength={6}
                      style={{ 
                        width: '100%',
                        padding: '12px 16px 12px 44px',
                        background: editing ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        color: 'inherit',
                        fontSize: 14,
                        opacity: editing ? 1 : 0.7,
                        cursor: editing ? 'text' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      position: 'absolute', 
                      left: 16, 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      fontSize: 18,
                      pointerEvents: 'none'
                    }}>📮</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>
                    Landmark
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="address.landmark"
                      value={formData.address.landmark}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Optional"
                      style={{ 
                        width: '100%',
                        padding: '12px 16px 12px 44px',
                        background: editing ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        color: 'inherit',
                        fontSize: 14,
                        opacity: editing ? 1 : 0.7,
                        cursor: editing ? 'text' : 'not-allowed'
                      }}
                    />
                    <span style={{ 
                      position: 'absolute', 
                      left: 16, 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      fontSize: 18,
                      pointerEvents: 'none'
                    }}>🗺️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {editing && (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={cancelEdit}
                className="btn"
                disabled={saving}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <X size={16} />
                Cancel
              </button>
              <motion.button
                type="submit"
                className="btn"
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                {saving ? (
                  <>
                    <div className="spinner" style={{ width: 16, height: 16 }} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </motion.button>
            </div>
          )}
        </form>
      </motion.div>
    </main>
  );
}

export default ProfilePage;
