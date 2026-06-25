import React, { useEffect, useState } from "react";
import { Trash2, X } from "lucide-react";
import AdminPage from "./AdminPage";
import { API_BASE, inr } from "../config/constants";
import a5xCarKit from "../assets/a5x-car-kit.jpg";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [authError, setAuthError] = useState(false);

  useEffect(() => { fetchOrders(); }, [filter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('a5x-admin-token');
      if (!token) { setAuthError(true); setOrders([]); setLoading(false); return; }
      const url = filter === 'all' ? `${API_BASE}/api/orders` : `${API_BASE}/api/orders?status=${filter}`;
      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setAuthError(true);
          localStorage.removeItem('a5x-admin-token');
          localStorage.removeItem('a5x-admin-user');
        }
        setOrders([]);
        return;
      }
      setAuthError(false);
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    setUpdatingId(orderId + status);
    try {
      const token = localStorage.getItem('a5x-admin-token');
      const response = await fetch(`${API_BASE}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (response.ok) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
        setSelectedOrder(prev => prev ? { ...prev, status } : null);
        const label = status === 'confirmed' ? 'confirmed ✅' : status === 'shipped' ? 'marked as shipped 🚚' : status === 'delivered' ? 'marked as delivered 🎉' : 'cancelled ❌';
        alert(`Order ${label}`);
      } else {
        alert(data.error || 'Failed to update order');
      }
    } catch (error) {
      alert('Failed to update order. Check your connection.');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteOrder = async (orderId, orderNumber, e) => {
    // Stop card click from opening modal
    if (e) e.stopPropagation();

    if (!window.confirm(`Delete order #${orderNumber}?\n\nThis cannot be undone.`)) return;

    setDeletingId(orderId);
    try {
      const token = localStorage.getItem('a5x-admin-token');
      const response = await fetch(`${API_BASE}/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setOrders(prev => prev.filter(o => o._id !== orderId));
        if (selectedOrder?._id === orderId) setSelectedOrder(null);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete order');
      }
    } catch (error) {
      alert('Failed to delete order. Check your connection.');
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status) => ({ pending: '#ffa500', confirmed: '#00ff88', processing: '#00bfff', shipped: '#9370db', delivered: '#32cd32', cancelled: '#ff4444' }[status] || '#888');

  if (loading) return <div className="admin-page"><p>Loading orders...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Orders Management</h1>
        <div className="filter-buttons">
          {['all', 'pending', 'confirmed', 'shipped', 'delivered'].map(s => (
            <button key={s} className={filter === s ? 'active' : ''} onClick={() => setFilter(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
          ))}
        </div>
      </div>

      {authError && <div style={{ padding: '16px', background: 'rgba(255,0,0,0.1)', borderRadius: '8px', marginBottom: '16px', color: '#ff4444' }}>Authentication error. Please <a href="/admin/login" style={{ color: '#00d4ff' }}>login again</a>.</div>}

      <div className="orders-grid">
        {orders.length === 0 ? <p>No orders found</p> : orders.map(order => (
          <div key={order._id} className="order-card glass-card" onClick={() => setSelectedOrder(order)}>
            <div className="order-header">
              <h3>#{order.orderNumber}</h3>
              <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>{order.status}</span>
            </div>
            <div className="order-info">
              <p><strong>{order.customerName}</strong></p>
              <p>{order.customerPhone}</p>
              <p>{order.customerEmail}</p>
              <p className="order-date">{new Date(order.orderDate || order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="order-summary">
              <p>{order.items.length} item(s)</p>
              <p><strong>{inr(order.total)}</strong></p>
            </div>
            {/* Delete button — full width at bottom of card */}
            <button
              className="order-delete-btn"
              title="Delete order"
              disabled={deletingId === order._id}
              onClick={(e) => deleteOrder(order._id, order.orderNumber, e)}
            >
              <Trash2 size={13} />
              {deletingId === order._id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="icon-btn close" onClick={() => setSelectedOrder(null)}><X /></button>
            <h2>Order Details - #{selectedOrder.orderNumber}</h2>
            <div className="order-details">
              <div className="detail-section">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
              </div>
              <div className="detail-section">
                <h3>Shipping Address</h3>
                <p>{selectedOrder.address.street}</p>
                <p>{selectedOrder.address.city}, {selectedOrder.address.state}</p>
                <p>Pincode: {selectedOrder.address.pincode}</p>
                {selectedOrder.address.landmark && <p>Landmark: {selectedOrder.address.landmark}</p>}
              </div>
              <div className="detail-section">
                <h3>Order Items</h3>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <img src={item.imageUrl || a5xCarKit} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div><p><strong>{item.name}</strong></p><p>Qty: {item.quantity} × {inr(item.price)}</p></div>
                    <p><strong>{inr(item.price * item.quantity)}</strong></p>
                  </div>
                ))}
              </div>
              <div className="detail-section">
                <h3>Payment</h3>
                <p><strong>Method:</strong> {selectedOrder.paymentMethod.toUpperCase()}</p>
                <p><strong>Total:</strong> {inr(selectedOrder.total)}</p>
              </div>
              {selectedOrder.customerNotes && <div className="detail-section"><h3>Customer Notes</h3><p>{selectedOrder.customerNotes}</p></div>}
              <div className="detail-section">
                <h3>Update Status</h3>
                <div className="status-buttons">
                  {selectedOrder.status === 'pending' && <button className="btn btn-success" disabled={!!updatingId} onClick={() => updateOrderStatus(selectedOrder._id, 'confirmed')}>{updatingId === selectedOrder._id + 'confirmed' ? 'Confirming...' : '✅ Confirm Order'}</button>}
                  {selectedOrder.status === 'confirmed' && <button className="btn btn-primary" disabled={!!updatingId} onClick={() => updateOrderStatus(selectedOrder._id, 'shipped')}>{updatingId === selectedOrder._id + 'shipped' ? 'Updating...' : '🚚 Mark as Shipped'}</button>}
                  {selectedOrder.status === 'shipped' && <button className="btn btn-success" disabled={!!updatingId} onClick={() => updateOrderStatus(selectedOrder._id, 'delivered')}>{updatingId === selectedOrder._id + 'delivered' ? 'Updating...' : '🎉 Mark as Delivered'}</button>}
                  {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && <button className="btn btn-danger" disabled={!!updatingId} onClick={() => updateOrderStatus(selectedOrder._id, 'cancelled')}>{updatingId === selectedOrder._id + 'cancelled' ? 'Cancelling...' : '❌ Cancel Order'}</button>}
                </div>
              </div>
              {/* Delete from modal */}
              <div className="detail-section" style={{ borderTop: '1px solid rgba(255,68,68,0.2)', paddingTop: '16px' }}>
                <h3 style={{ color: '#ff4444' }}>Danger Zone</h3>
                <button
                  className="btn btn-danger"
                  disabled={deletingId === selectedOrder._id}
                  onClick={(e) => deleteOrder(selectedOrder._id, selectedOrder.orderNumber, e)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Trash2 size={16} />
                  {deletingId === selectedOrder._id ? 'Deleting...' : 'Delete Order Permanently'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
