import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, RefreshCw, Rocket, User, X } from 'lucide-react';
import useAuthModalStore from '../../stores/useAuthModalStore';
import useAuthStore from '../../stores/useAuthStore';
import { API_BASE } from '../../config/constants';

export default function AuthModal() {
  const { isOpen, close, redirectPath } = useAuthModalStore();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, signup } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email format';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 8) errs.password = 'Min 8 characters';
    if (!isLogin) {
      if (!formData.name) errs.name = 'Name is required';
      if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

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
      if (!response.ok) throw new Error(data.error || data.details?.[0]?.message || 'Authentication failed');

      const userData = { id: data.user.id, name: data.user.username, email: data.user.email, role: data.user.role, token: data.token };
      if (isLogin) login(userData); else signup(userData);
      localStorage.setItem('a5x-token', data.token);
      close();
      if (redirectPath) navigate(redirectPath);
    } catch (error) {
      setErrors({ form: error.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(0,212,255,0.25)',
    borderRadius: '10px', color: '#fff', padding: '12px 14px 12px 40px', fontSize: '14px',
    fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'all 0.25s ease', boxSizing: 'border-box'
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflowY: 'auto' }} onClick={close}>
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '20px', padding: '36px 32px', maxWidth: '420px', width: '100%', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.8)', maxHeight: '90vh', overflowY: 'auto', margin: 'auto' }} onClick={(e) => e.stopPropagation()}>

        <button onClick={close} style={{ position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: 8, display: 'flex' }}>
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #2B52F5, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff' }}>
            <User size={20} />
          </div>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            {isLogin ? 'Enter your details to continue' : 'Sign up to get started'}
          </p>
        </div>

        {errors.form && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '8px 12px', marginBottom: 14, fontSize: 12, color: '#f87171', display: 'flex', alignItems: 'center', gap: 6 }}>
            <X size={12} /> {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {!isLogin && (
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#00d4ff', marginBottom: 6, display: 'block' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.25)'; e.target.style.boxShadow = 'none'; }} />
                <User size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              </div>
              {errors.name && <span style={{ fontSize: 11, color: '#f87171', marginTop: 2 }}>{errors.name}</span>}
            </div>
          )}

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#00d4ff', marginBottom: 6, display: 'block' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.25)'; e.target.style.boxShadow = 'none'; }} />
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            {errors.email && <span style={{ fontSize: 11, color: '#f87171', marginTop: 2 }}>{errors.email}</span>}
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#00d4ff', marginBottom: 6, display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="••••••••" style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.25)'; e.target.style.boxShadow = 'none'; }} />
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: 2 }}>
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && <span style={{ fontSize: 11, color: '#f87171', marginTop: 2 }}>{errors.password}</span>}
          </div>

          {!isLogin && (
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#00d4ff', marginBottom: 6, display: 'block' }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input name="confirmPassword" type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.25)'; e.target.style.boxShadow = 'none'; }} />
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              {errors.confirmPassword && <span style={{ fontSize: 11, color: '#f87171', marginTop: 2 }}>{errors.confirmPassword}</span>}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? 'rgba(43,82,245,0.5)' : '#2B52F5', border: 'none', borderRadius: 10, color: '#fff', padding: '13px', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4, transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {loading ? <><RefreshCw size={15} style={{ animation: 'spin 0.8s linear infinite' }} /> Processing...</> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '2px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }} />
          </div>

          {/* Google */}
          <button type="button" onClick={() => { window.location.href = `${API_BASE}/api/auth/google`; }}
            style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 10, color: '#fff', padding: '12px', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.25s' }}>
            <svg width="17" height="17" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Toggle */}
        <div style={{ textAlign: 'center', marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button onClick={() => { setIsLogin(!isLogin); setFormData({ name: '', email: '', password: '', confirmPassword: '' }); setErrors({}); }}
            style={{ fontSize: 13, color: '#2B52F5', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', marginLeft: 4 }}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
