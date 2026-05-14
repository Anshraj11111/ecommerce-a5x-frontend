import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, RefreshCw, Rocket, User, X } from 'lucide-react';
import { useAuthModalStore } from '../../stores/useAuthModalStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { API_BASE } from '../../config/constants';

export default function AuthModal() {
  const { isOpen, close, redirectPath } = useAuthModalStore();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup } = useAuthStore();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const sanitizedUsername = formData.name
        ? formData.name.replace(/[^a-zA-Z0-9_-]/g, '')
        : formData.email.split('@')[0].replace(/[^a-zA-Z0-9_-]/g, '');

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: sanitizedUsername, email: formData.email, password: formData.password };

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details?.[0]?.message || 'Authentication failed');
      }

      const userData = {
        id: data.user.id,
        name: data.user.username,
        email: data.user.email,
        role: data.user.role,
        token: data.token
      };

      if (isLogin) {
        login(userData);
      } else {
        signup(userData);
      }

      localStorage.setItem('a5x-token', data.token);
      close();
      if (redirectPath) {
        navigate(redirectPath);
      }
    } catch (error) {
      alert(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflowY: 'auto' }} onClick={close}>
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '24px', padding: '40px 36px', maxWidth: '460px', width: '100%', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,212,255,0.2)', maxHeight: '90vh', overflowY: 'auto', margin: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={close} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', transition: 'color 0.2s', zIndex: 1 }} onMouseEnter={(e) => e.target.style.color = '#00d4ff'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}>
          <X size={24} />
        </button>

        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '32px', fontWeight: 900, background: 'linear-gradient(135deg, #fff 0%, #00f5ff 50%, #0066FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 0 16px rgba(0,245,255,0.5))', letterSpacing: '2px' }}>A5X</span>
          </div>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '26px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
            {isLogin ? 'Login to continue shopping' : 'Sign up to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {!isLogin && (
            <div>
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#00d4ff', marginBottom: '8px', display: 'block' }}>Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required={!isLogin} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(0,212,255,0.25)', borderRadius: '12px', color: '#fff', padding: '14px 16px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'all 0.3s ease' }} onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.background = 'rgba(0,212,255,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.25)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }} />
            </div>
          )}

          <div>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#00d4ff', marginBottom: '8px', display: 'block' }}>Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(0,212,255,0.25)', borderRadius: '12px', color: '#fff', padding: '14px 16px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'all 0.3s ease' }} onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.background = 'rgba(0,212,255,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.25)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }} />
          </div>

          <div>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#00d4ff', marginBottom: '8px', display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="••••••••" required style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(0,212,255,0.25)', borderRadius: '12px', color: '#fff', padding: '14px 16px', paddingRight: '48px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'all 0.3s ease' }} onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.background = 'rgba(0,212,255,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.25)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#00d4ff'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                <Eye size={18} />
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#00d4ff', marginBottom: '8px', display: 'block' }}>Confirm Password</label>
              <input name="confirmPassword" type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required={!isLogin} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(0,212,255,0.25)', borderRadius: '12px', color: '#fff', padding: '14px 16px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'all 0.3s ease' }} onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.background = 'rgba(0,212,255,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.25)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }} />
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? 'rgba(0,212,255,0.3)' : 'linear-gradient(135deg, #00d4ff 0%, #0066FF 100%)', border: 'none', borderRadius: '12px', color: '#fff', padding: '16px', fontSize: '15px', fontWeight: 700, fontFamily: 'Inter, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', transition: 'all 0.3s ease', boxShadow: loading ? 'none' : '0 4px 24px rgba(0,212,255,0.5)' }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Processing...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                {isLogin ? <><User size={18} />Sign In</> : <><Rocket size={18} />Create Account</>}
              </span>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button onClick={() => { setIsLogin(!isLogin); setFormData({ name: '', email: '', password: '', confirmPassword: '' }); }} style={{ background: 'transparent', border: '1.5px solid rgba(0,212,255,0.35)', borderRadius: '10px', color: '#00d4ff', padding: '9px 22px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '13px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.target.style.background = 'rgba(0,212,255,0.12)'; e.target.style.borderColor = '#00d4ff'; }} onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(0,212,255,0.35)'; }}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
