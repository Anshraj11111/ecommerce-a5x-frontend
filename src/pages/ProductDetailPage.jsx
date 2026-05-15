import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Check, CheckCircle, ChevronRight, Heart, MessageSquare, Minus, Package, Plus, Shield, ShoppingCart, Star, Truck, X, Zap } from "lucide-react";
import useAdminStore from "../stores/useAdminStore";
import useCartStore from "../stores/useCartStore";
import useWishlistStore from "../stores/useWishlistStore";
import useRecentlyViewedStore from "../stores/useRecentlyViewedStore";
import StarRating from "../components/common/StarRating";
import { inr } from "../config/constants";
import motorDriver from "../assets/motor-driver.jpg";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useAdminStore((s) => s.products);
  const product = products.find((p) => p.id === id);
  const add = useCartStore((s) => s.add);
  const addRecent = useRecentlyViewedStore((s) => s.add);
  const wishToggle = useWishlistStore((s) => s.toggle);
  const wishlisted = useWishlistStore((s) => s.ids.includes(id));
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, name: "Rahul Kumar", rating: 5, comment: "Excellent product! Works perfectly with my Arduino projects.", date: "2 days ago" },
    { id: 2, name: "Priya Sharma", rating: 4, comment: "Good quality, fast delivery. Recommended!", date: "1 week ago" },
    { id: 3, name: "Amit Patel", rating: 5, comment: "Best price in the market. Very satisfied with the purchase.", date: "2 weeks ago" }
  ]);

  useEffect(() => { if (id) addRecent(id); window.scrollTo(0, 0); }, [id]);

  if (!product) return (
    <main className="page">
      <section style={{ textAlign: "center", paddingTop: 120 }}>
        <h1>Product Not Found</h1>
        <button className="btn" onClick={() => navigate("/shop")}>Back to Shop</button>
      </section>
    </main>
  );

  const discount = product.mrp ? Math.round((1 - product.price / product.mrp) * 100) : 0;
  const relatedProducts = (product.relatedIds || []).map((rid) => products.find((p) => p.id === rid)).filter(Boolean);
  const boughtTogether = (product.frequentlyBoughtWith || []).map((rid) => products.find((p) => p.id === rid)).filter(Boolean);
  const recentIds = useRecentlyViewedStore((s) => s.ids);
  const recentProducts = recentIds.filter((rid) => rid !== id).map((rid) => products.find((p) => p.id === rid)).filter(Boolean).slice(0, 6);
  const tabs = ["Overview", "Specifications", "Compatibility", "Reviews"];

  const handleImgMouse = (e) => { const r = e.currentTarget.getBoundingClientRect(); setZoomPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedbackRating === 0 || !feedbackText.trim() || !feedbackName.trim()) { alert('Please fill all fields and select a rating'); return; }
    setReviews([{ id: reviews.length + 1, name: feedbackName, rating: feedbackRating, comment: feedbackText, date: 'Just now' }, ...reviews]);
    setFeedbackSubmitted(true);
    setFeedbackRating(0); setFeedbackText(''); setFeedbackName('');
    setTimeout(() => setFeedbackSubmitted(false), 3000);
  };

  return (
    <main className="page product-detail-page">
      <nav className="breadcrumb">
        <Link to="/shop">Shop</Link><ChevronRight size={16} />
        <Link to={`/shop?cat=${product.category}`}>{product.category}</Link><ChevronRight size={16} />
        <span>{product.name}</span>
      </nav>

      <section className="pd-hero">
        <div className="pd-gallery">
          <div className={`pd-main-image ${zoomed ? "zoomed" : ""}`} onMouseEnter={() => setZoomed(true)} onMouseLeave={() => setZoomed(false)} onMouseMove={handleImgMouse}>
            <img src={product.imageUrl || motorDriver} alt={product.name} style={zoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transform: "scale(2)" } : {}} />
          </div>
          <div className="pd-image-badges">{product.badges?.map((b) => <span key={b} className="image-badge">{b}</span>)}</div>
        </div>

        <div className="pd-info">
          <div className="pd-header"><div><span className="pd-category">{product.category}</span><h1>{product.name}</h1><p className="sku">SKU: {product.sku}</p></div></div>
          <div className="pd-rating-section"><StarRating rating={product.rating} size={20} /><span className="rating-text">{product.rating} out of 5</span><span className="review-count">({reviews.length} reviews)</span></div>
          <div className="pd-price-section">
            <div className="price-main"><span className="current-price">{inr(product.price)}</span><span className="price-unit">/piece</span></div>
            {product.mrp && <div className="price-secondary"><s className="original-price">{inr(product.mrp)}</s><span className="discount-tag">{discount}% OFF</span></div>}
          </div>

          {product.bulkPricing && (
            <div className="bulk-pricing-section">
              <h4><Package size={16} /> Bulk Pricing</h4>
              <table className="bulk-table">
                <thead><tr><th>Quantity</th><th>Price/pc</th><th>You Save</th></tr></thead>
                <tbody>{product.bulkPricing.map((bp) => <tr key={bp.min}><td>{bp.min}–{bp.max === 999 ? "∞" : bp.max} pcs</td><td>{inr(bp.price)}</td><td className="save-amount">{inr(product.price - bp.price)}</td></tr>)}</tbody>
              </table>
            </div>
          )}

          <div className="pd-stock-info">
            {product.inStock ? <div className="stock-available"><CheckCircle size={18} /><span>In Stock ({product.stockCount} units available)</span></div> : <div className="stock-unavailable"><X size={18} /><span>Out of Stock</span></div>}
          </div>

          <div className="qty-section">
            <label>Quantity:</label>
            <div className="qty-selector">
              <button onClick={() => setQty(Math.max(product.minQty || 1, qty - 1))} disabled={!product.inStock}><Minus size={16} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} disabled={!product.inStock}><Plus size={16} /></button>
            </div>
            <small>Min order: {product.minQty || 1} pcs</small>
          </div>

          <div className="pd-actions">
            <button className="btn-add-cart" onClick={() => { for (let i = 0; i < qty; i++) add(product); }} disabled={!product.inStock}><ShoppingCart size={18} />Add to Quote</button>
            <button className={`btn-wishlist ${wishlisted ? "active" : ""}`} onClick={() => wishToggle(product.id)}><Heart size={18} fill={wishlisted ? "currentColor" : "none"} /></button>
          </div>

          <div className="pd-features-quick">
            <div className="feature-item"><Truck size={20} /><div><strong>Fast Delivery</strong><span>Ships in 2-3 business days</span></div></div>
            <div className="feature-item"><Shield size={20} /><div><strong>Genuine Product</strong><span>100% authentic from A5X Robotics</span></div></div>
            <div className="feature-item"><Zap size={20} /><div><strong>Free Shipping</strong><span>On orders above ₹999</span></div></div>
          </div>

          {product.compatibility?.length > 0 && (
            <div className="pd-compatibility">
              <h4>Compatible With:</h4>
              <div className="compat-tags">{product.compatibility.map((c) => <span key={c} className="compat-tag">{c}</span>)}</div>
            </div>
          )}
        </div>
      </section>

      <section className="pd-tabs-section">
        <div className="tab-headers">{tabs.map((t, i) => <button key={t} className={activeTab === i ? "active" : ""} onClick={() => setActiveTab(i)}>{t}</button>)}</div>
        <div className="tab-content">
          {activeTab === 0 && <div className="tab-overview"><h3>Product Description</h3><p>{product.shortDescription}</p>{product.features && <><h4>Key Features</h4><ul className="features-list">{product.features.map((f) => <li key={f}><Check size={18} /><span>{f}</span></li>)}</ul></>}</div>}
          {activeTab === 1 && <div className="tab-specs"><h3>Technical Specifications</h3>{product.specs && <table className="specs-table"><tbody>{Object.entries(product.specs).map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}</tbody></table>}</div>}
          {activeTab === 2 && <div className="tab-compat"><h3>Compatibility Information</h3><div className="compat-grid">{product.compatibility?.map((c) => <div key={c} className="compat-card"><CheckCircle size={20} /><span>{c}</span></div>)}</div></div>}
          {activeTab === 3 && (
            <div className="tab-reviews">
              <h3>Customer Reviews ({reviews.length})</h3>
              <div className="reviews-summary"><div className="summary-rating"><div className="big-rating">{product.rating}</div><StarRating rating={product.rating} size={24} /><span>{reviews.length} reviews</span></div></div>
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header"><div className="reviewer-info"><div className="reviewer-avatar">{review.name.charAt(0)}</div><div><strong>{review.name}</strong><span className="review-date">{review.date}</span></div></div><StarRating rating={review.rating} size={16} /></div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="pd-feedback-section">
        <div className="feedback-container">
          <h3>Share Your Experience</h3>
          <p className="feedback-subtitle">Help others make informed decisions</p>
          {feedbackSubmitted && <div className="feedback-success"><CheckCircle size={20} /><span>Thank you for your feedback!</span></div>}
          <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
            <div className="form-group"><label>Your Name</label><input type="text" placeholder="Enter your name" value={feedbackName} onChange={(e) => setFeedbackName(e.target.value)} required /></div>
            <div className="form-group"><label>Your Rating</label><div className="rating-input">{[1,2,3,4,5].map((star) => <Star key={star} size={32} fill={star <= feedbackRating ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth={2} onClick={() => setFeedbackRating(star)} style={{ cursor: 'pointer' }} />)}</div></div>
            <div className="form-group"><label>Your Review</label><textarea placeholder="Share your experience with this product..." value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} rows={4} required /></div>
            <button type="submit" className="btn-submit-feedback"><MessageSquare size={18} />Submit Review</button>
          </form>
        </div>
      </section>

      {boughtTogether.length > 0 && <section className="pd-recs"><h3>Frequently Bought Together</h3><div className="recs-row">{boughtTogether.map((p) => <Link key={p.id} to={`/shop/${p.id}`} className="rec-card"><img src={p.imageUrl || motorDriver} alt={p.name} /><span>{p.name}</span><strong>{inr(p.price)}</strong></Link>)}</div></section>}
      {relatedProducts.length > 0 && <section className="pd-recs"><h3>Similar Products</h3><div className="recs-row">{relatedProducts.map((p) => <Link key={p.id} to={`/shop/${p.id}`} className="rec-card"><img src={p.imageUrl || motorDriver} alt={p.name} /><span>{p.name}</span><strong>{inr(p.price)}</strong></Link>)}</div></section>}
      {recentProducts.length > 0 && <section className="pd-recs"><h3>Recently Viewed</h3><div className="recs-row">{recentProducts.map((p) => <Link key={p.id} to={`/shop/${p.id}`} className="rec-card"><img src={p.imageUrl || motorDriver} alt={p.name} /><span>{p.name}</span><strong>{inr(p.price)}</strong></Link>)}</div></section>}
    </main>
  );
}

export default ProductDetailPage;
