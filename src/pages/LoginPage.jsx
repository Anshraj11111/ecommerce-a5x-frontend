import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, RefreshCw, User } from "lucide-react";
import useAuthStore from "../stores/useAuthStore";
import { API_BASE } from "../config/constants";
import loginImage from "../assets/axie-mascot.jpg";

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

  return (
    <main style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Left Side - Login Form */}
      <div style={{ background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: 900, color: '#4f46e5', letterSpacing: '1px' }}>A5X</span>
              <small style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, color: '#6b7280', letterSpacing: '1.5px', marginTop: '4px' }}>ROBOTICS</small>
            </Link>
          </div>

          {/* User Icon */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', background: '#4f46e5', borderRadius: '16px', marginBottom: '16px' }}>
              <User size={28} style={{ color: 'white' }} />
            </div>
          </div>

          {/* Welcome Text */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1f2937', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Welcome home</h1>
            <p style={{ fontSize: '14px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>Please enter your details.</p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {!isLogin && (
              <div>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '6px', display: 'block' }}>Full Name</label>
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Enter your full name" 
                  required={!isLogin} 
                  style={{ 
                    width: '100%', 
                    background: '#f1f5f9', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px', 
                    color: '#1f2937', 
                    padding: '12px 16px', 
                    fontSize: '14px', 
                    fontFamily: 'Inter, sans-serif', 
                    outline: 'none',
                    boxSizing: 'border-box'
                  }} 
                />
              </div>
            )}
            
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '6px', display: 'block' }}>Email</label>
              <input 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="admin@a5xrobotics.com" 
                required 
                style={{ 
                  width: '100%', 
                  background: '#f1f5f9', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '8px', 
                  color: '#1f2937', 
                  padding: '12px 16px', 
                  fontSize: '14px', 
                  fontFamily: 'Inter, sans-serif', 
                  outline: 'none',
                  boxSizing: 'border-box'
                }} 
              />
            </div>
            
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '6px', display: 'block' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  name="password" 
                  type={showPassword ? 'text' : 'password'} 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="••••••••••" 
                  required 
                  style={{ 
                    width: '100%', 
                    background: '#f1f5f9', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px', 
                    color: '#1f2937', 
                    padding: '12px 16px', 
                    paddingRight: '45px',
                    fontSize: '14px', 
                    fontFamily: 'Inter, sans-serif', 
                    outline: 'none',
                    boxSizing: 'border-box'
                  }} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  style={{ 
                    position: 'absolute', 
                    right: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    background: 'none', 
                    border: 'none', 
                    color: '#6b7280', 
                    cursor: 'pointer', 
                    padding: '4px', 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '6px', display: 'block' }}>Confirm Password</label>
                <input 
                  name="confirmPassword" 
                  type={showPassword ? 'text' : 'password'} 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="••••••••••" 
                  required={!isLogin} 
                  style={{ 
                    width: '100%', 
                    background: '#f1f5f9', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px', 
                    color: '#1f2937', 
                    padding: '12px 16px', 
                    fontSize: '14px', 
                    fontFamily: 'Inter, sans-serif', 
                    outline: 'none',
                    boxSizing: 'border-box'
                  }} 
                />
              </div>
            )}

            {/* Remember me and Forgot password */}
            {isLogin && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#374151', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                  Remember me
                </label>
                <Link to="/forgot-password" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Login Button */}
            <button 
              type="submit" 
              disabled={loading} 
              style={{ 
                width: '100%', 
                background: loading ? '#9ca3af' : '#4f46e5', 
                border: 'none', 
                borderRadius: '8px', 
                color: '#fff', 
                padding: '12px', 
                fontSize: '14px', 
                fontWeight: 600, 
                fontFamily: 'Inter, sans-serif', 
                cursor: loading ? 'not-allowed' : 'pointer', 
                marginTop: '8px'
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Processing...
                </span>
              ) : (
                isLogin ? 'Login' : 'Sign Up'
              )}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '8px 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            </div>

            {/* Google Login */}
            <button 
              type="button" 
              onClick={() => { window.location.href = `${API_BASE}/api/auth/google`; }} 
              style={{ 
                width: '100%', 
                background: 'white', 
                border: '1px solid #d1d5db', 
                borderRadius: '8px', 
                color: '#374151', 
                padding: '12px', 
                fontSize: '14px', 
                fontWeight: 500, 
                fontFamily: 'Inter, sans-serif', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px' 
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Switch between Login/Signup */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button 
              onClick={() => { 
                setIsLogin(!isLogin); 
                setFormData({ name: '', email: '', password: '', confirmPassword: '' }); 
              }} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#4f46e5', 
                fontWeight: 600, 
                cursor: 'pointer', 
                fontFamily: 'Inter, sans-serif', 
                fontSize: '14px',
                textDecoration: 'underline'
              }}
            >
              {isLogin ? 'Sign up for free' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div style={{ 
        background: 'linear-gradient(180deg, #2d1b69 0%, #4c2a85 30%, #7c3aed 60%, #d946ef 85%, #ec4899 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: `url(${loginImage})`, 
          backgroundSize: 'contain', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat'
        }} />
        
        {/* Content overlay */}
        <div style={{ 
          position: 'absolute', 
          bottom: '60px', 
          left: '40px', 
          zIndex: 1, 
          color: 'white'
        }}>
          <p style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontSize: '12px', 
            fontWeight: 600, 
            color: 'rgba(255,255,255,0.8)', 
            marginBottom: '8px',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            A5X CONTROL
          </p>
          <h2 style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontSize: '32px', 
            fontWeight: 700, 
            marginBottom: '4px', 
            lineHeight: 1.1,
            margin: 0
          }}>
            Build smarter
          </h2>
          <h3 style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontSize: '32px', 
            fontWeight: 700, 
            margin: 0,
            lineHeight: 1.1
          }}>
            robotics kits.
          </h3>
        </div>
      </div>

      <style>{`
        @keyframes spin { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        } 
        @media (max-width: 1024px) { 
          main { 
            grid-template-columns: 1fr !important; 
          } 
          main > div:last-child { 
            display: none !important; 
          } 
        }
      `}</style>
    </main>
  );
}

export default LoginPage;
