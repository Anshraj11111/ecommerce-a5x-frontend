import React, { useEffect, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import AdminPage from "./AdminPage";
import { API_BASE } from "../config/constants";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const token = localStorage.getItem('a5x-admin-token');
        if (!token) {
          const local = JSON.parse(localStorage.getItem('a5x-contacts') || '[]');
          setContacts(local);
          return;
        }
        const res = await fetch(`${API_BASE}/api/contacts`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setContacts(data.contacts || []);
          return;
        }
      } catch (err) {
        console.error('Contacts fetch error:', err);
      }
      const local = JSON.parse(localStorage.getItem('a5x-contacts') || '[]');
      setContacts(local);
    };
    loadContacts();
  }, []);

  const markRead = (id) => {
    const updated = contacts.map(c => c.id === id ? { ...c, status: 'read' } : c);
    setContacts(updated);
    localStorage.setItem('a5x-contacts', JSON.stringify(updated));
  };

  const deleteContact = (id) => {
    if (!confirm('Delete this contact?')) return;
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    localStorage.setItem('a5x-contacts', JSON.stringify(updated));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = filter === 'all' ? contacts : contacts.filter(c => c.status === filter || (!c.status && filter === 'new'));
  const newCount = contacts.filter(c => !c.status || c.status === 'new').length;

  return (
    <AdminPage title="Contact Messages">
      <div className="contacts-toolbar">
        <div className="contacts-filters">
          {[['all', 'All'], ['new', 'New'], ['read', 'Read']].map(([val, label]) => (
            <button key={val} className={`contacts-filter-btn ${filter === val ? 'active' : ''}`} onClick={() => setFilter(val)}>
              {label} {val === 'new' && newCount > 0 && <span className="contacts-badge">{newCount}</span>}
            </button>
          ))}
        </div>
        <span className="contacts-count">{filtered.length} messages</span>
      </div>

      {filtered.length === 0 ? (
        <div className="contacts-empty">
          <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
          <p>No contact messages yet</p>
        </div>
      ) : (
        <div className="contacts-layout">
          <div className="contacts-list">
            {filtered.map(contact => (
              <div
                key={contact.id}
                className={`contact-item ${selected?.id === contact.id ? 'active' : ''} ${!contact.status || contact.status === 'new' ? 'unread' : ''}`}
                onClick={() => { setSelected(contact); markRead(contact.id); }}
              >
                <div className="contact-item-avatar">{contact.name?.[0]?.toUpperCase() || '?'}</div>
                <div className="contact-item-info">
                  <div className="contact-item-name">{contact.name}</div>
                  <div className="contact-item-preview">{contact.message?.slice(0, 50)}...</div>
                  <div className="contact-item-time">{new Date(contact.createdAt).toLocaleDateString('en-IN')}</div>
                </div>
                {(!contact.status || contact.status === 'new') && <div className="contact-unread-dot" />}
              </div>
            ))}
          </div>

          <div className="contact-detail">
            {selected ? (
              <>
                <div className="contact-detail-header">
                  <div className="contact-detail-avatar">{selected.name?.[0]?.toUpperCase()}</div>
                  <div>
                    <h3 className="contact-detail-name">{selected.name}</h3>
                    <p className="contact-detail-org">{selected.organization || 'No organization'}</p>
                  </div>
                  <button className="contact-delete-btn" onClick={() => deleteContact(selected.id)}><Trash2 size={16} /></button>
                </div>
                <div className="contact-detail-fields">
                  <div className="contact-field"><span className="contact-field-label">📧 Email</span><a href={`mailto:${selected.email}`} className="contact-field-value contact-link">{selected.email || '—'}</a></div>
                  <div className="contact-field"><span className="contact-field-label">📱 Phone</span><a href={`tel:${selected.phone}`} className="contact-field-value contact-link">{selected.phone || '—'}</a></div>
                  <div className="contact-field"><span className="contact-field-label">🏢 Organization</span><span className="contact-field-value">{selected.organization || '—'}</span></div>
                  <div className="contact-field"><span className="contact-field-label">📅 Date</span><span className="contact-field-value">{new Date(selected.createdAt).toLocaleString('en-IN')}</span></div>
                </div>
                <div className="contact-message-box">
                  <p className="contact-field-label">💬 Message</p>
                  <p className="contact-message-text">{selected.message}</p>
                </div>
                <div className="contact-reply-actions">
                  <a href={`mailto:${selected.email}?subject=Re: Your inquiry to A5X Robotics`} className="btn">Reply via Email</a>
                  {selected.phone && (
                    <a href={`https://wa.me/91${selected.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn ghost">WhatsApp</a>
                  )}
                </div>
              </>
            ) : (
              <div className="contact-detail-empty">
                <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminPage>
  );
}

export default AdminContacts;
