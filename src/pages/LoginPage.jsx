import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, RefreshCw, Rocket, User } from "lucide-react";
import useAuthStore from "../stores/useAuthStore";
import { API_BASE } from "../config/constants";
import loginImage from "../assets/team/login.png";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuthStore();

  useEffect(() => { if (isAuthenticated) navigate('/'); }, [isAuthenticated, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isLogin && formData.password !== formData.confirmPassword) { alert('Passwords do not match!'); setLoading(false); return; }
    if (formData.password.length < 8) { alert('Password must be at least 8 characters long'); setLoading(false); return; }
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const sanitizedUsername = formData.name ? formData.name.replace(/[^a-zA-Z0-9_-]/g, '') : formData.email.split('@')[0].replace(/[^a-zA-Z0-9_-]/g, '');
      const payload = isLogin ? { email: formData.email, password: formData.password } : { username: sanitizedUsername, email: formData.email, password: formData.password };
      const response = await fetch(`${API_BASE}${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || data.details?.[0]?.message || 'Authentication failed');
      const userData = { id: data.user.id, name: data.user.username, email: data.user.email, role: data.user.role, token: data.token };
      if (isLogin) { login(userData); } else { signup(userData); }
      localStorage.setItem('a5x-token', data.token);
      navigate('/');
    } catch (error) {
      alert(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(0,212,255,0.25)', borderRadius: '14px', color: '#fff', padding: '15px 18px', fontSize: '15px', fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'all 0.3s ease' };

  return (
    <main style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#0a0e1a', fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', position: 'relative', zIndex: 2 }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ marginBottom: '56px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '36px', fontWeight: 900, background: 'linear-gradient(135deg, #fff 0%, #00f5ff 50%, #0066FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '2px' }}>A5X</span>
              <small style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 800, color: 'rgba(0,245,255,0.8)', letterSpacing: '2.5px', marginTop: '8px' }}>ROBOTICS</small>
            </Link>
          </div>
          <div style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '24px', padding: '48px 44px', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
            <div style={{ marginBottom: '36px' }}>
              <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '34px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>{isLogin ? 'Welcome back' : 'Create account'}</h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.6)' }}>{isLogin ? 'Enter your credentials to continue' : 'Sign up to get started with A5X'}</p>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {!isLogin && (
                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#00d4ff', marginBottom: '10px', display: 'block' }}>Full Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required={!isLogin} style={inputStyle} />
                </div>
              )}
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#00d4ff', marginBottom: '10px', display: 'block' }}>Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required style={inputStyle} />
              </div>
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#00d4ff', marginBottom: '10px', display: 'block' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="••••••••" required style={{ ...inputStyle, paddingRight: '50px' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
                    <Eye size={19} />
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#00d4ff', marginBottom: '10px', display: 'block' }}>Confirm Password</label>
                  <input name="confirmPassword" type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required={!isLogin} style={inputStyle} />
                </div>
              )}
              <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? 'rgba(0,212,255,0.3)' : 'linear-gradient(135deg, #00d4ff 0%, #0066FF 100%)', border: 'none', borderRadius: '14px', color: '#fff', padding: '17px', fontSize: '16px', fontWeight: 700, fontFamily: 'Inter, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '12px', boxShadow: loading ? 'none' : '0 4px 24px rgba(0,212,255,0.5)' }}>
                {loading ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}><RefreshCw size={19} style={{ animation: 'spin 1s linear infinite' }} />Processing...</span>
                  : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>{isLogin ? <><User size={19} />Sign In</> : <><Rocket size={19} />Create Account</>}</span>}
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '8px 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>or continue with</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
              </div>
              <button type="button" onClick={() => { window.location.href = `${API_BASE}/api/auth/google`; }} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '14px', color: '#fff', padding: '15px', fontSize: '15px', fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '28px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
              <button onClick={() => { setIsLogin(!isLogin); setFormData({ name: '', email: '', password: '', confirmPassword: '' }); }} style={{ background: 'transparent', border: '1.5px solid rgba(0,212,255,0.35)', borderRadius: '12px', color: '#00d4ff', padding: '11px 28px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="login-visual-side" style={{ background: '#0a0e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${loginImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,14,26,0.5) 0%, rgba(15,23,42,0.4) 50%, rgba(10,14,26,0.6) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '60px' }}>
          <div style={{ marginBottom: '40px' }}><Rocket size={90} style={{ color: '#00d4ff', filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.7))' }} /></div>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '42px', fontWeight: 800, color: '#fff', marginBottom: '20px', lineHeight: 1.2 }}>Build the Future<br />with Robotics</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: '440px', margin: '0 auto' }}>Join thousands of makers and innovators creating amazing projects with A5X Robotics</p>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @media (max-width: 1024px) { main { grid-template-columns: 1fr !important; } .login-visual-side { display: none !important; } }`}</style>
    </main>
  );
}

export default LoginPage;
