import { useEffect, useState } from "react";
import { MessageSquare, Trash2, RefreshCw } from "lucide-react";
import AdminPage from "./AdminPage";
import { API_BASE } from "../config/constants";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('a5x-admin-token');
      const res = await fetch(`${API_BASE}/api/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts || []);
      } else {
        console.error('Failed to fetch contacts:', res.status);
      }
    } catch (err) {
      console.error('Contacts fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadContacts(); }, []);

  const markRead = async (id) => {
    try {
      const token = localStorage.getItem('a5x-admin-token');
      await fetch(`${API_BASE}/api/contacts/${id}/status`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' })
      });
      setContacts(prev => prev.map(c => (c._id === id || c.id === id) ? { ...c, status: 'read' } : c));
    } catch (err) {
      console.error('Mark read error:', err);
    }
  };

  const deleteContact = async (id) => {
    if (!confirm('Delete this contact?')) return;
    try {
      const token = localStorage.getItem('a5x-admin-token');
      await fetch(`${API_BASE}/api/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setContacts(prev => prev.filter(c => c._id !== id && c.id !== id));
      if (selected?._id === id || selected?.id === id) setSelected(null);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const getId = (c) => c._id || c.id;

  const filtered = filter === 'all'
    ? contacts
    : contacts.filter(c => c.status === filter || (!c.status && filter === 'new'));

  const newCount = contacts.filter(c => !c.status || c.status === 'new').length;

  return (
    <AdminPage title="Contact Messages">
      <div className="contacts-toolbar">
        <div className="contacts-filters">
          {[['all', 'All'], ['new', 'New'], ['read', 'Read']].map(([val, label]) => (
            <button
              key={val}
              className={`contacts-filter-btn ${filter === val ? 'active' : ''}`}
              onClick={() => setFilter(val)}
            >
              {label} {val === 'new' && newCount > 0 && <span className="contacts-badge">{newCount}</span>}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="contacts-count">{filtered.length} messages</span>
          <button
            onClick={loadContacts}
            style={{ background: 'none', border: '1px solid rgba(0,229,255,0.3)', borderRadius: '6px', color: '#00e5ff', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: '#8A9BB5' }}>Loading contacts...</div>
      ) : filtered.length === 0 ? (
        <div className="contacts-empty">
          <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
          <p>No contact messages yet</p>
        </div>
      ) : (
        <div className="contacts-layout">
          <div className="contacts-list">
            {filtered.map(contact => (
              <div
                key={getId(contact)}
                className={`contact-item ${selected && getId(selected) === getId(contact) ? 'active' : ''} ${!contact.status || contact.status === 'new' ? 'unread' : ''}`}
                onClick={() => { setSelected(contact); markRead(getId(contact)); }}
              >
                <div className="contact-item-avatar">{contact.name?.[0]?.toUpperCase() || '?'}</div>
                <div className="contact-item-info">
                  <div className="contact-item-name">{contact.name}</div>
                  <div className="contact-item-preview">{contact.message?.slice(0, 50)}...</div>
                  <div className="contact-item-time">
                    {new Date(contact.createdAt).toLocaleDateString('en-IN')}
                  </div>
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
                  <button className="contact-delete-btn" onClick={() => deleteContact(getId(selected))}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="contact-detail-fields">
                  <div className="contact-field">
                    <span className="contact-field-label">📧 Email</span>
                    <a href={`mailto:${selected.email}`} className="contact-field-value contact-link">{selected.email || '—'}</a>
                  </div>
                  <div className="contact-field">
                    <span className="contact-field-label">📱 Phone</span>
                    <a href={`tel:${selected.phone}`} className="contact-field-value contact-link">{selected.phone || '—'}</a>
                  </div>
                  <div className="contact-field">
                    <span className="contact-field-label">🏢 Organization</span>
                    <span className="contact-field-value">{selected.organization || '—'}</span>
                  </div>
                  <div className="contact-field">
                    <span className="contact-field-label">📅 Date</span>
                    <span className="contact-field-value">{new Date(selected.createdAt).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="contact-field">
                    <span className="contact-field-label">🔖 Status</span>
                    <span className="contact-field-value" style={{ color: selected.status === 'new' ? '#fbbf24' : '#22c55e' }}>
                      {selected.status || 'new'}
                    </span>
                  </div>
                </div>
                <div className="contact-message-box">
                  <p className="contact-field-label">💬 Message</p>
                  <p className="contact-message-text">{selected.message}</p>
                </div>
                <div className="contact-reply-actions">
                  <a href={`mailto:${selected.email}?subject=Re: Your inquiry to A5X Robotics`} className="btn">
                    Reply via Email
                  </a>
                  {selected.phone && (
                    <a
                      href={`https://wa.me/91${selected.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn ghost"
                    >
                      WhatsApp
                    </a>
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
