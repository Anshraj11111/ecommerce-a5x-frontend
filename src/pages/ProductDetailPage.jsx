import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Check, CheckCircle, ChevronRight, Heart, MessageSquare, Minus, Package, Plus, Shield, ShoppingCart, Star, Truck, X, Zap } from "lucide-react";
import useAdminStore from "../stores/useAdminStore";
import useCartStore from "../stores/useCartStore";
import useWishlistStore from "../stores/useWishlistStore";
import useRecentlyViewedStore from "../stores/useRecentlyViewedStore";
import StarRating from "../components/common/StarRating";
import { inr, API_BASE } from "../config/constants";
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
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      addRecent(id);
      window.scrollTo(0, 0);
      // Fetch real reviews from API
      fetch(`${API_BASE}/api/reviews/product/${id}`)
        .then(r => r.json())
        .then(data => { if (Array.isArray(data)) setReviews(data); })
        .catch(() => setReviews([]));
    }
  }, [id]);

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

  const handleImgMouse = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoomPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.email || !reviewForm.comment) return;
    setSubmittingReview(true);
    try {
      const res = await fetch(`${API_BASE}/api/reviews/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...reviewForm, kitId: `product-${id}`, productId: id })
      });
      if (res.ok) {
        setReviewSubmitted(true);
        setReviewForm({ name: '', email: '', rating: 5, comment: '' });
        setTimeout(() => setReviewSubmitted(false), 4000);
      }
    } catch (err) {
      console.error('Review submit error:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    background: isActive ? 'rgba(0,229,255,0.1)' : 'transparent',
    border: 'none',
    borderBottom: isActive ? '2px solid #00e5ff' : '2px solid transparent',
    color: isActive ? '#00e5ff' : '#8A9BB5',
    cursor: 'pointer',
    fontWeight: isActive ? '600' : '400',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    fontFamily: 'Space Grotesk, Inter, sans-serif'
  });

  const specRow = (label, value) => value ? (
    <tr key={label}>
      <td style={{ padding: '10px 16px', color: '#8A9BB5', fontWeight: '500', width: '40%', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{label}</td>
      <td style={{ padding: '10px 16px', color: '#e8e8f0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{value}</td>
    </tr>
  ) : null;

  return (
    <main className="page product-detail-page">
      <nav className="breadcrumb">
        <Link to="/shop">Shop</Link><ChevronRight size={16} />
        <Link to={`/shop?cat=${product.category}`}>{product.category}</Link><ChevronRight size={16} />
        <span>{product.name}</span>
      </nav>

      {/* Hero */}
      <section className="pd-hero">
        <div className="pd-gallery">
          <div className={`pd-main-image ${zoomed ? "zoomed" : ""}`} onMouseEnter={() => setZoomed(true)} onMouseLeave={() => setZoomed(false)} onMouseMove={handleImgMouse}>
            <img src={product.imageUrl || motorDriver} alt={product.name} style={zoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transform: "scale(2)" } : {}} />
          </div>
          <div className="pd-image-badges">{product.badges?.map((b) => <span key={b} className="image-badge">{b}</span>)}</div>
        </div>

        <div className="pd-info">
          <div className="pd-header">
            <span className="pd-category">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="sku">SKU: {product.sku}</p>
          </div>
          <div className="pd-rating-section">
            <StarRating rating={product.rating} size={20} />
            <span className="rating-text">{product.rating} out of 5</span>
            <span className="review-count">({reviews.length} reviews)</span>
          </div>
          <div className="pd-price-section">
            <div className="price-main"><span className="current-price">{inr(product.price)}</span><span className="price-unit">/piece</span></div>
            {product.mrp && <div className="price-secondary"><s className="original-price">{inr(product.mrp)}</s><span className="discount-tag">{discount}% OFF</span></div>}
          </div>

          {product.bulkPricing?.length > 0 && (
            <div className="bulk-pricing-section">
              <h4><Package size={16} /> Bulk Pricing</h4>
              <table className="bulk-table">
                <thead><tr><th>Quantity</th><th>Price/pc</th><th>You Save</th></tr></thead>
                <tbody>{product.bulkPricing.map((bp) => <tr key={bp.min}><td>{bp.min}–{bp.max === 999 ? "∞" : bp.max} pcs</td><td>{inr(bp.price)}</td><td className="save-amount">{inr(product.price - bp.price)}</td></tr>)}</tbody>
              </table>
            </div>
          )}

          <div className="pd-stock-info">
            {product.inStock
              ? <div className="stock-available"><CheckCircle size={18} /><span>In Stock ({product.stockCount} units)</span></div>
              : <div className="stock-unavailable"><X size={18} /><span>Out of Stock</span></div>}
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
            <button className="btn-add-cart" onClick={() => { for (let i = 0; i < qty; i++) add(product); }} disabled={!product.inStock}>
              <ShoppingCart size={18} />Add to Cart
            </button>
            <button className={`btn-wishlist ${wishlisted ? "active" : ""}`} onClick={() => wishToggle(product.id)}>
              <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="pd-features-quick">
            <div className="feature-item"><Truck size={20} /><div><strong>Fast Delivery</strong><span>Ships in 2-3 business days</span></div></div>
            <div className="feature-item"><Shield size={20} /><div><strong>Genuine Product</strong><span>100% authentic from A5X</span></div></div>
            <div className="feature-item"><Zap size={20} /><div><strong>Free Shipping</strong><span>On orders above ₹999</span></div></div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem' }}>
        {/* Tab Headers */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem', overflowX: 'auto' }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)} style={tabStyle(activeTab === i)}>{t}</button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: '300px' }}>

          {/* Overview */}
          {activeTab === 0 && (
            <div>
              <h3 style={{ color: '#00e5ff', marginBottom: '1rem' }}>Product Description</h3>
              <p style={{ color: '#8A9BB5', lineHeight: '1.7', marginBottom: '2rem' }}>
                {product.overview || product.shortDescription || 'High-quality component from A5X Robotics. Perfect for your robotics and electronics projects.'}
              </p>
              {product.features?.length > 0 && (
                <>
                  <h3 style={{ color: '#00e5ff', marginBottom: '1rem' }}>Key Features</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '8px' }}>
                    {product.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#8A9BB5' }}>
                        <Check size={16} style={{ color: '#00e5ff', marginTop: '2px', flexShrink: 0 }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* Specifications */}
          {activeTab === 1 && (
            <div>
              <h3 style={{ color: '#00e5ff', marginBottom: '1.5rem' }}>Technical Specifications</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', overflow: 'hidden' }}>
                <tbody>
                  {specRow('Dimensions', product.dimensions)}
                  {specRow('Weight', product.weight)}
                  {specRow('Power Requirements', product.power)}
                  {specRow('Operating Temperature', product.temperature)}
                  {product.specs && Object.entries(product.specs).map(([k, v]) => specRow(k, v))}
                  {!product.dimensions && !product.weight && !product.power && !product.temperature && (!product.specs || Object.keys(product.specs).length === 0) && (
                    <tr><td colSpan={2} style={{ padding: '24px', textAlign: 'center', color: '#8A9BB5' }}>No specifications added yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Compatibility */}
          {activeTab === 2 && (
            <div>
              <h3 style={{ color: '#00e5ff', marginBottom: '1.5rem' }}>Platform Compatibility</h3>
              {product.compatibility?.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
                  {product.compatibility.map((c, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(0,229,255,0.15)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle size={18} style={{ color: '#00e5ff', flexShrink: 0 }} />
                      <span style={{ color: '#e8e8f0', fontSize: '14px' }}>{c}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#8A9BB5' }}>No compatibility information added yet.</p>
              )}
              {product.software?.length > 0 && (
                <>
                  <h3 style={{ color: '#00e5ff', marginBottom: '1rem' }}>Software Requirements</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '8px' }}>
                    {product.software.map((s, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8A9BB5' }}>
                        <Check size={16} style={{ color: '#00e5ff' }} /><span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* Reviews */}
          {activeTab === 3 && (
            <div>
              <h3 style={{ color: '#00e5ff', marginBottom: '1.5rem' }}>Customer Reviews ({reviews.length})</h3>

              {/* Rating Summary */}
              {reviews.length > 0 && (
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(0,229,255,0.1)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#00e5ff', fontFamily: 'JetBrains Mono, monospace' }}>
                    {(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)}
                  </div>
                  <div>
                    <div style={{ color: '#fbbf24', fontSize: '20px', marginBottom: '4px' }}>
                      {'★'.repeat(Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length))}
                    </div>
                    <div style={{ color: '#8A9BB5', fontSize: '14px' }}>{reviews.length} reviews</div>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <div style={{ display: 'grid', gap: '12px', marginBottom: '2.5rem' }}>
                {reviews.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Star size={40} style={{ color: '#8A9BB5', opacity: 0.4, marginBottom: '12px' }} />
                    <p style={{ color: '#8A9BB5', margin: 0 }}>No reviews yet. Be the first!</p>
                  </div>
                ) : reviews.map((review, i) => (
                  <div key={review._id || i} style={{ background: 'rgba(255,255,255,0.05)', padding: '16px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a6ef5, #00e5ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', color: '#000' }}>
                          {review.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div style={{ color: '#e8e8f0', fontWeight: '600', fontSize: '14px' }}>{review.name}</div>
                          <div style={{ color: '#6b7280', fontSize: '12px' }}>{new Date(review.createdAt || review.date).toLocaleDateString('en-IN')}</div>
                        </div>
                      </div>
                      <div style={{ color: '#fbbf24', fontSize: '14px' }}>{'★'.repeat(review.rating)}</div>
                    </div>
                    <p style={{ color: '#8A9BB5', margin: 0, lineHeight: '1.6', fontSize: '14px' }}>{review.comment}</p>
                  </div>
                ))}
              </div>

              {/* Review Form */}
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '24px', borderRadius: '14px', border: '1px solid rgba(0,229,255,0.12)' }}>
                <h3 style={{ color: '#00e5ff', marginBottom: '6px' }}>Share Your Experience</h3>
                <p style={{ color: '#8A9BB5', marginBottom: '20px', fontSize: '14px' }}>Help others make informed decisions</p>

                {reviewSubmitted && (
                  <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} /> Review submitted! Visible after admin approval.
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} style={{ display: 'grid', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <input type="text" placeholder="Your Name" value={reviewForm.name} onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} required
                      style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '8px', color: 'white', fontFamily: 'inherit', fontSize: '14px' }} />
                    <input type="email" placeholder="Your Email" value={reviewForm.email} onChange={e => setReviewForm({ ...reviewForm, email: e.target.value })} required
                      style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '8px', color: 'white', fontFamily: 'inherit', fontSize: '14px' }} />
                  </div>
                  <div>
                    <label style={{ color: '#8A9BB5', fontSize: '13px', marginBottom: '8px', display: 'block' }}>Rating</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[1,2,3,4,5].map(star => (
                        <button key={star} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          style={{ background: 'none', border: 'none', fontSize: '28px', color: star <= reviewForm.rating ? '#fbbf24' : '#374151', cursor: 'pointer', padding: '0', lineHeight: 1 }}>★</button>
                      ))}
                    </div>
                  </div>
                  <textarea placeholder="Share your experience with this product..." value={reviewForm.comment} onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })} required rows={4}
                    style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '8px', color: 'white', fontFamily: 'inherit', fontSize: '14px', resize: 'vertical' }} />
                  <button type="submit" disabled={submittingReview}
                    style={{ padding: '12px 24px', background: submittingReview ? '#374151' : 'linear-gradient(135deg, #1a6ef5, #0d4ed4)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '700', cursor: submittingReview ? 'not-allowed' : 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <MessageSquare size={16} />{submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {boughtTogether.length > 0 && <section className="pd-recs"><h3>Frequently Bought Together</h3><div className="recs-row">{boughtTogether.map((p) => <Link key={p.id} to={`/shop/${p.id}`} className="rec-card"><img src={p.imageUrl || motorDriver} alt={p.name} /><span>{p.name}</span><strong>{inr(p.price)}</strong></Link>)}</div></section>}
      {relatedProducts.length > 0 && <section className="pd-recs"><h3>Similar Products</h3><div className="recs-row">{relatedProducts.map((p) => <Link key={p.id} to={`/shop/${p.id}`} className="rec-card"><img src={p.imageUrl || motorDriver} alt={p.name} /><span>{p.name}</span><strong>{inr(p.price)}</strong></Link>)}</div></section>}
      {recentProducts.length > 0 && <section className="pd-recs"><h3>Recently Viewed</h3><div className="recs-row">{recentProducts.map((p) => <Link key={p.id} to={`/shop/${p.id}`} className="rec-card"><img src={p.imageUrl || motorDriver} alt={p.name} /><span>{p.name}</span><strong>{inr(p.price)}</strong></Link>)}</div></section>}
    </main>
  );
}

export default ProductDetailPage;
