import React, { useState } from "react";
import SEO from "../components/common/SEO";
import robotHandshake from "../assets/robot-handshake.jpg";
import { API_BASE } from "../config/constants";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', organization: '', email: '', phone: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.phone && formData.phone.replace(/\D/g, '').length > 10) {
      alert('Phone number cannot exceed 10 digits');
      setLoading(false);
      return;
    }

    const contactData = { ...formData, id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'new' };

    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const contacts = JSON.parse(localStorage.getItem('a5x-contacts') || '[]');
        contacts.unshift(contactData);
        localStorage.setItem('a5x-contacts', JSON.stringify(contacts));
        setSubmitted(true);
        setFormData({ name: '', organization: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Server error');
      }
    } catch {
      const contacts = JSON.parse(localStorage.getItem('a5x-contacts') || '[]');
      contacts.unshift(contactData);
      localStorage.setItem('a5x-contacts', JSON.stringify(contacts));
      setSubmitted(true);
      setFormData({ name: '', organization: '', email: '', phone: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', padding: '12px 16px', fontSize: '14px' };

  if (submitted) return (
    <main className="contact-page">
      <section className="contact-form glass-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
        <h2 style={{ color: 'var(--brand-cyan)', marginBottom: '12px' }}>Message Sent!</h2>
        <p style={{ color: 'var(--brand-steel)', marginBottom: '28px' }}>We'll get back to you within 24 hours.</p>
        <button className="btn" onClick={() => setSubmitted(false)}>Send Another Message</button>
      </section>
      <section className="contact-image"><img src={robotHandshake} alt="" /></section>
    </main>
  );

  return (
    <main className="contact-page">
      <SEO
        title="Contact A5X Robotics — Partner for Workshops & Bulk Orders"
        description="Contact A5X Robotics for robotics workshops, school lab setup, bulk component orders, or custom kit requests. Based in Jabalpur, serving schools across India."
        keywords="contact a5x robotics, robotics workshop inquiry, bulk robotics order, school lab setup india"
        url="/contact"
      />
      <section className="contact-form glass-card">
        <p className="eyebrow">CONTACT</p>
        <h1>Let's Build Together</h1>
        <p style={{ color: 'var(--brand-steel)', marginBottom: '28px' }}>Partner with A5X Industries for robotics workshops, lab setup, or bulk component orders.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name *" required style={inputStyle} />
          <input name="organization" value={formData.organization} onChange={handleChange} placeholder="School / Organization" style={inputStyle} />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" required style={inputStyle} />
          <input
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
              setFormData({ ...formData, phone: val });
            }}
            placeholder="Phone Number (10 digits)"
            maxLength={10}
            style={inputStyle}
          />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message *" rows={5} required style={{ ...inputStyle, resize: 'vertical' }} />
          <button type="submit" className="btn" disabled={loading} style={{ marginTop: '4px' }}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
      <section className="contact-image"><img src={robotHandshake} alt="Robot and human hand" /></section>
    </main>
  );
}

export default ContactPage;
