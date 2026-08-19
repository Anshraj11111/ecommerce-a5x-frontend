import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeIndianRupee, Check, CheckCircle, MessageSquare, Package, Shield, ShoppingCart, Truck, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import { API_BASE, inr } from "../config/constants";
import a5xCarKit from "../assets/a5x-car-kit.jpg";

// ── India Post Shipping Calculator ──────────────────────────
function parseWeightGrams(w) {
  if (!w) return null;
  const s = String(w).toLowerCase().trim();
  const n = parseFloat(s);
  if (isNaN(n)) return null;
  return s.includes('kg') ? Math.round(n * 1000) : Math.round(n);
}
function categoryWeight(cat) {
  return ({ MicroController:30, Sensor:20, 'Motor Driver':40, Motor:120, Display:60, Communication:25, Power:80, Cable:30, Tool:150, Kit:500 }[cat] || 50);
}
function calcTotalWeightGrams(items) {
  return items.reduce((sum, item) => sum + (parseWeightGrams(item.weight) || categoryWeight(item.category)) * item.qty, 0);
}
function calcSpeedPost(grams, distance) {
  const slabs = [[50,15,25,35],[200,25,45,70],[500,30,65,90]];
  const add = { local:10, short:30, long:50 };
  const idx = { local:1, short:2, long:3 };
  for (const row of slabs) if (grams <= row[0]) return row[idx[distance]];
  return { local:30, short:65, long:90 }[distance] + Math.ceil((grams-500)/500)*add[distance];
}
function calcRegisteredParcel(grams) {
  return 19 + Math.ceil(Math.max(0, grams-500)/500)*16;
}
function getShippingOptions(items, pincode) {
  const grams = calcTotalWeightGrams(items);
  const pin = String(pincode||'');
  let distance = 'long';
  if (pin.startsWith('48')||pin.startsWith('47')||pin.startsWith('49')) distance='local';
  else if (pin.startsWith('4')||pin.startsWith('3')||pin.startsWith('5')) distance='short';
  const subtotalVal = items.reduce((s,i)=>s+i.price*i.qty,0);
  return {
    grams,
    options: [
      { id:'speed_post', label:'Speed Post', sub:'3–5 business days', cost:calcSpeedPost(grams,distance), icon:'⚡' },
      { id:'registered', label:'Registered Parcel', sub:'5–7 business days', cost:calcRegisteredParcel(grams), icon:'📦' },
      { id:'free', label:'Standard Shipping', sub:'Free — orders above ₹999', cost:0, icon:'🎁', disabled:subtotalVal<999 },
    ],
  };
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [qrTimer, setQrTimer] = useState(120);
  const [qrExpired, setQrExpired] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('speed_post');
  const timerRef = useRef(null);

  const upiId = localStorage.getItem('a5x-upi-id') || '';

  const [formData, setFormData] = useState({
    customerName:'', customerEmail:'', customerPhone:'',
    street:'', city:'', state:'', pincode:'', landmark:'',
    customerNotes:'', paymentMethod:'cod'
  });

  const shipping = useMemo(() => getShippingOptions(items, formData.pincode), [items, formData.pincode]);

  const shippingCost = useMemo(() => {
    const opt = shipping.options.find(o => o.id === selectedShipping);
    return (opt && !opt.disabled) ? opt.cost : shipping.options[0].cost;
  }, [shipping, selectedShipping]);

  const orderTotal = subtotal() + shippingCost;
  const upiQrUrl = upiId ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(`upi://pay?pa=${upiId}&pn=A5X+Robotics&am=${orderTotal}&cu=INR`)}` : '';

  useEffect(() => {
    if (formData.paymentMethod === 'online' && upiId) {
      setShowQR(true); setQrTimer(120); setQrExpired(false); setPaymentConfirmed(false);
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => setQrTimer(prev => { if (prev <= 1) { clearInterval(timerRef.current); setQrExpired(true); return 0; } return prev - 1; }), 1000);
    } else { setShowQR(false); clearInterval(timerRef.current); }
    return () => clearInterval(timerRef.current);
  }, [formData.paymentMethod, upiId]);

  const refreshQR = () => { setQrExpired(false); setQrTimer(120); clearInterval(timerRef.current); timerRef.current = setInterval(() => setQrTimer(prev => { if (prev <= 1) { clearInterval(timerRef.current); setQrExpired(true); return 0; } return prev - 1; }), 1000); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'customerPhone') { setFormData({ ...formData, customerPhone: value.replace(/\D/g, '').slice(0, 10) }); return; }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.customerPhone.length !== 10) { alert('Please enter a valid 10-digit phone number.'); return; }
    if (formData.paymentMethod === 'online' && upiId && !paymentConfirmed) { alert('Please scan the QR code and tick "I have completed the payment" before placing your order.'); return; }
    setLoading(true);
    try {
      const orderData = {
        customerName: formData.customerName, customerEmail: formData.customerEmail, customerPhone: formData.customerPhone,
        address: { street: formData.street, city: formData.city, state: formData.state, pincode: formData.pincode, landmark: formData.landmark },
        items: items.map(item => ({ productId: item.id, name: item.name, price: item.price, quantity: item.qty, imageUrl: item.imageUrl })),
        subtotal: subtotal(), shippingCost, shippingMethod: selectedShipping, tax: 0, total: orderTotal,
        paymentMethod: formData.paymentMethod, customerNotes: formData.customerNotes
      };
      
      console.log('Sending order data:', orderData);
      
      const response = await fetch(`${API_BASE}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderData) });
      const data = await response.json();
      
      console.log('Order response:', data);
      
      if (response.ok && data.success) { 
        clearInterval(timerRef.current); 
        setSuccess(true); 
        setOrderNumber(data.order.orderNumber); 
        useCartStore.setState({ items: [] }); 
        setTimeout(() => navigate('/'), 5000); 
      }
      else { 
        console.error('Order failed:', data);
        alert(`Order failed: ${data.error || data.message || 'Please try again.'}`); 
      }
    } catch (error) { 
      console.error('Order submission error:', error);
      alert(`Order failed: ${error.message}. Please try again.`); 
    }
    finally { setLoading(false); }
  };

  const qrMins = String(Math.floor(qrTimer / 60)).padStart(2, '0');
  const qrSecs = String(qrTimer % 60).padStart(2, '0');

  if (items.length === 0 && !success) return (
    <main className="checkout-page">
      <div className="checkout-empty glass-card">
        <ShoppingCart size={56} style={{ opacity: 0.4, marginBottom: 16 }} />
        <h2>Your cart is empty</h2><p>Add some products before checking out</p>
        <Link to="/shop" className="btn" style={{ marginTop: 24 }}>Go to Shop</Link>
      </div>
    </main>
  );

  if (success) return (
    <main className="checkout-page">
      <motion.div className="checkout-success glass-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="success-icon"><CheckCircle size={64} color="#00ff88" /></div>
        <h2>Order Placed!</h2><p className="order-num">#{orderNumber}</p>
        <p className="success-msg">Thank you! We'll send a confirmation to your email shortly.</p>
        <Link to="/" className="btn" style={{ marginTop: 24 }}>Back to Home</Link>
      </motion.div>
    </main>
  );

  return (
    <main className="checkout-page">
      <motion.div className="checkout-container" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="checkout-form glass-card">
          <div className="checkout-header"><Shield size={28} color="#00ff88" /><h1>Secure Checkout</h1><p className="checkout-subtitle">Complete your order in a few simple steps</p></div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-section">
              <div className="section-header"><div className="section-icon"><MessageSquare size={18} /></div><h3>Contact Information</h3></div>
              <div className="input-group"><span className="input-prefix-icon">👤</span><input type="text" name="customerName" placeholder="Full Name" value={formData.customerName} onChange={handleChange} required /></div>
              <div className="input-group"><span className="input-prefix-icon">📧</span><input type="email" name="customerEmail" placeholder="Email Address" value={formData.customerEmail} onChange={handleChange} required /></div>
              <div className="input-group"><span className="input-prefix-icon">📱</span><input type="tel" name="customerPhone" placeholder="10-digit Phone Number" value={formData.customerPhone} onChange={handleChange} maxLength={10} pattern="\d{10}" inputMode="numeric" required /><span className="phone-counter" style={{ color: formData.customerPhone.length === 10 ? '#00ff88' : 'rgba(255,255,255,0.4)' }}>{formData.customerPhone.length}/10</span></div>
            </div>
            <div className="form-section">
              <div className="section-header"><div className="section-icon"><Truck size={18} /></div><h3>Shipping Address</h3></div>
              <div className="input-group"><span className="input-prefix-icon">🏠</span><input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required /></div>
              <div className="form-row">
                <div className="input-group"><span className="input-prefix-icon">🏙️</span><input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required /></div>
                <div className="input-group"><span className="input-prefix-icon">📍</span><input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required /></div>
              </div>
              <div className="form-row">
                <div className="input-group"><span className="input-prefix-icon">📮</span><input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required /></div>
                <div className="input-group"><span className="input-prefix-icon">🗺️</span><input type="text" name="landmark" placeholder="Landmark (Optional)" value={formData.landmark} onChange={handleChange} /></div>
              </div>
            </div>
            {/* Shipping Cost Info — read-only, no user selection */}
            <div className="form-section">
              <div className="section-header"><div className="section-icon"><Package size={18} /></div><h3>Shipping Details</h3></div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>⚡</span>
                    <strong style={{ fontSize: '14px', color: '#fff' }}>Speed Post</strong>
                  </div>
                  <strong style={{ fontSize: '16px', color: '#00ff88' }}>{shippingCost === 0 ? <span className="free-badge">FREE</span> : inr(shippingCost)}</strong>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: '4px 0 0' }}>
                  Est. delivery: 3–5 business days • Parcel weight: <strong style={{color:'rgba(255,255,255,0.8)'}}>{shipping.grams >= 1000 ? `${(shipping.grams/1000).toFixed(2)} kg` : `${shipping.grams} g`}</strong>
                </p>
                {shippingCost === 0 && <p style={{ fontSize: '11px', color: 'rgba(0,255,136,0.8)', margin: '6px 0 0', fontWeight: '600' }}>✨ Free shipping on orders ≥ ₹999</p>}
              </div>
            </div>
            <div className="form-section">
              <div className="section-header"><div className="section-icon"><BadgeIndianRupee size={18} /></div><h3>Payment Method</h3></div>
              <div className="payment-options">
                {[{ value: 'cod', icon: <Truck size={22} />, label: 'Cash on Delivery', sub: 'Pay when you receive' }, { value: 'online', icon: <Zap size={22} />, label: 'Online Payment', sub: 'UPI, Cards, Net Banking' }, { value: 'bank_transfer', icon: <BadgeIndianRupee size={22} />, label: 'Bank Transfer', sub: 'Direct bank transfer' }].map(opt => (
                  <label key={opt.value} className={`payment-option ${formData.paymentMethod === opt.value ? 'active' : ''}`}>
                    <input type="radio" name="paymentMethod" value={opt.value} checked={formData.paymentMethod === opt.value} onChange={handleChange} />
                    <div className="payment-content"><span className="pay-icon">{opt.icon}</span><div><strong>{opt.label}</strong><p>{opt.sub}</p></div>{formData.paymentMethod === opt.value && <Check size={16} className="pay-check" />}</div>
                  </label>
                ))}
              </div>
              <AnimatePresence>
                {showQR && upiId && (
                  <motion.div className="qr-panel glass-card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                    <p className="qr-title">Scan to Pay via UPI</p><p className="qr-upi-id">{upiId}</p>
                    <div className="qr-image-wrap" style={{ position: 'relative' }}>
                      {qrExpired ? <div className="qr-expired-overlay"><p>QR Expired</p><button type="button" className="btn" onClick={refreshQR} style={{ marginTop: 10, padding: '8px 20px', fontSize: 13 }}>Refresh QR</button></div> : <img src={upiQrUrl} alt="UPI QR Code" className="qr-image" />}
                    </div>
                    <div className={`qr-timer ${qrTimer <= 30 ? 'urgent' : ''}`}><span>⏱ QR expires in </span><strong>{qrMins}:{qrSecs}</strong></div>
                    <p className="qr-note">After payment, place your order below</p>
                    <label className="qr-confirm-label"><input type="checkbox" checked={paymentConfirmed} onChange={e => setPaymentConfirmed(e.target.checked)} disabled={qrExpired} /><span>I have completed the payment ✅</span></label>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="form-section">
              <div className="section-header"><div className="section-icon"><MessageSquare size={18} /></div><h3>Order Notes <span style={{ fontWeight: 400, opacity: 0.5, fontSize: 13 }}>(Optional)</span></h3></div>
              <textarea name="customerNotes" placeholder="Any special instructions for your order?" value={formData.customerNotes} onChange={handleChange} rows="3" className="notes-textarea" />
            </div>
            <motion.button type="submit" className="checkout-btn" disabled={loading || (formData.paymentMethod === 'online' && upiId && !paymentConfirmed)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {loading ? <><div className="spinner" />Processing...</> : <><Shield size={18} />Place Secure Order — {inr(orderTotal)}</>}
            </motion.button>
            <div className="secure-badge"><Shield size={14} /><span>Secure SSL Encrypted Checkout</span></div>
          </form>
        </div>

        <div className="order-summary glass-card">
          <div className="summary-header"><ShoppingCart size={20} /><h3>Order Summary</h3><span className="summary-count">{items.reduce((s, i) => s + i.qty, 0)} item(s)</span></div>
          <div className="summary-items">
            {items.map(item => (
              <motion.div key={item.id} className="summary-item" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                <img src={item.imageUrl || a5xCarKit} alt={item.name} />
                <div className="item-details"><p className="item-name">{item.name}</p><p className="item-qty">Qty: {item.qty} × {inr(item.price)}</p></div>
                <p className="item-total">{inr(item.price * item.qty)}</p>
              </motion.div>
            ))}
          </div>
          <div className="summary-divider" />
          <div className="summary-totals">
            <div className="summary-row"><span>Subtotal</span><span>{inr(subtotal())}</span></div>
            <div className="summary-row shipping">
              <span><Truck size={14} /> {shipping.options.find(o=>o.id===selectedShipping)?.label || 'Shipping'}</span>
              <span>{shippingCost === 0 ? <span className="free-badge">FREE</span> : inr(shippingCost)}</span>
            </div>
            <div className="summary-row total"><span>Total</span><span>{inr(orderTotal)}</span></div>
          </div>
          <div className="trust-badges">
            <div className="trust-badge"><Shield size={16} /><span>Secure Payment</span></div>
            <div className="trust-badge"><Truck size={16} /><span>Fast Delivery</span></div>
            <div className="trust-badge"><CheckCircle size={16} /><span>Easy Returns</span></div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default CheckoutPage;
