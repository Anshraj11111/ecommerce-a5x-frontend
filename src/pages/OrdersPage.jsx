import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, Truck, XCircle, ChevronRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE, inr } from "../config/constants";
import a5xCarKit from "../assets/a5x-car-kit.jpg";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/orders`, {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const data = await response.json();
      // Sort by date - newest first
      const sortedOrders = (data.orders || []).sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={18} color="#f59e0b" />;
      case 'confirmed': return <CheckCircle size={18} color="#10b981" />;
      case 'shipped': return <Truck size={18} color="#3b82f6" />;
      case 'delivered': return <CheckCircle size={18} color="#00ff88" />;
      case 'cancelled': return <XCircle size={18} color="#ef4444" />;
      default: return <Package size={18} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'confirmed': return '#10b981';
      case 'shipped': return '#3b82f6';
      case 'delivered': return '#00ff88';
      case 'cancelled': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <main className="orders-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" style={{ width: 40, height: 40 }} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="orders-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <Package size={56} style={{ opacity: 0.4 }} />
        <h2>Failed to load orders</h2>
        <p style={{ opacity: 0.6 }}>{error}</p>
        <button className="btn" onClick={fetchOrders} style={{ marginTop: 16 }}>Retry</button>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="orders-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, padding: '0 20px' }}>
        <Package size={56} style={{ opacity: 0.4 }} />
        <h2>No orders yet</h2>
        <p style={{ opacity: 0.6, textAlign: 'center' }}>Start shopping and your orders will appear here</p>
        <Link to="/shop" className="btn" style={{ marginTop: 16 }}>Browse Products</Link>
      </main>
    );
  }

  return (
    <main className="orders-page" style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 20px 60px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Package size={32} color="#00ff88" />
            My Orders
          </h1>
          <p style={{ opacity: 0.6, fontSize: 16 }}>Track and manage your orders</p>
        </div>

        <div className="orders-grid" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              className="order-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                padding: 24,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ scale: 1.01, borderColor: 'rgba(0,255,136,0.3)' }}
            >
              {/* Order Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
                      Order #{order.orderNumber}
                    </h3>
                    <span
                      className="status-badge"
                      style={{
                        background: `${getStatusColor(order.status)}20`,
                        color: getStatusColor(order.status),
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, opacity: 0.6 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={14} />
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Package size={14} />
                      {order.items.length} item(s)
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={14} />
                      {order.address.city}, {order.address.state}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#00ff88' }}>
                    {inr(order.total)}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.5, marginTop: 4 }}>
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, marginBottom: 16 }}>
                <div style={{ display: 'grid', gap: 12 }}>
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img 
                        src={item.imageUrl || a5xCarKit} 
                        alt={item.name}
                        style={{ 
                          width: 50, 
                          height: 50, 
                          objectFit: 'cover', 
                          borderRadius: 8,
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div>
                        <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>
                          Qty: {item.quantity} × {inr(item.price)}
                        </div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>
                        {inr(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div style={{ fontSize: 13, opacity: 0.6, textAlign: 'center', padding: '8px 0' }}>
                      +{order.items.length - 3} more item(s)
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div style={{ 
                background: 'rgba(255,255,255,0.02)', 
                borderRadius: 8, 
                padding: 14,
                fontSize: 13,
                opacity: 0.8
              }}>
                <div style={{ fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={14} />
                  Delivery Address
                </div>
                <div>
                  {order.address.street}, {order.address.city}<br />
                  {order.address.state} — {order.address.pincode}
                  {order.address.landmark && <><br />Landmark: {order.address.landmark}</>}
                </div>
              </div>

              {/* Tracking Number (if shipped) */}
              {order.trackingNumber && (
                <div style={{ 
                  marginTop: 16, 
                  padding: 12, 
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  borderRadius: 8,
                  fontSize: 13
                }}>
                  <span style={{ opacity: 0.8 }}>Tracking Number:</span>
                  <span style={{ marginLeft: 8, fontWeight: 600, color: '#3b82f6' }}>
                    {order.trackingNumber}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

export default OrdersPage;
