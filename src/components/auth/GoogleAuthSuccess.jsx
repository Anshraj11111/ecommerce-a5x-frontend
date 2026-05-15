import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import useAuthStore from '../../stores/useAuthStore';

export default function GoogleAuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userId = params.get('userId');
    const username = params.get('username');
    const email = params.get('email');
    const role = params.get('role');
    const error = params.get('error');

    if (error || !token) {
      alert('Google login failed. Please try again.');
      navigate('/login');
      return;
    }

    localStorage.setItem('a5x-token', token);
    localStorage.setItem('a5x-admin-token', token);

    login({
      id: userId,
      name: username,
      email: email,
      role: role,
      token: token
    });

    navigate('/');
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0e1a' }}>
      <div style={{ textAlign: 'center', color: '#fff' }}>
        <RefreshCw size={48} style={{ color: '#00d4ff', animation: 'spin 1s linear infinite', marginBottom: '20px' }} />
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: 'rgba(255,255,255,0.7)' }}>Signing you in with Google...</p>
      </div>
    </main>
  );
}
