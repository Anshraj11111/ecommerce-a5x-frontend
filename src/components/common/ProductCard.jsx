import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Heart, ShoppingCart, Star, Zap } from "lucide-react";
import useCartStore from "../../stores/useCartStore";
import useWishlistStore from "../../stores/useWishlistStore";
import { inr } from "../../config/constants";
import motorDriver from "../../assets/motor-driver.jpg";

function ProductCard({ product, compact, onQuickView }) {
  const add = useCartStore((s) => s.add);
  const navigate = useNavigate();
  const wishToggle = useWishlistStore((s) => s.toggle);
  const wishlisted = useWishlistStore((s) => s.ids.includes(product.id));
  const discount = product.mrp ? Math.round((1 - product.price / product.mrp) * 100) : 0;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    add(product);
    navigate('/checkout');
  };

  if (compact) {
    return (
      <Link to={`/shop/${product.id}`} className="product-card-compact">
        <img src={product.imageUrl || motorDriver} alt={product.name} />
        <div>
          <p>{product.name}</p>
          <strong>{inr(product.price)}</strong>
        </div>
      </Link>
    );
  }

  return (
    <article className="product-card">
      <div className="product-card-img-wrap">
        <Link to={`/shop/${product.id}`}>
          <img src={product.imageUrl || motorDriver} alt={product.name} />
        </Link>
        {discount > 0 && <span className="product-card-discount">-{discount}%</span>}
        {product.badges?.slice(0, 1).map((b) => <span key={b} className="product-card-badge">{b}</span>)}
        <div className="product-card-actions">
          <button onClick={() => wishToggle(product.id)} className={wishlisted ? "active" : ""} aria-label="Wishlist">
            <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
          </button>
          {onQuickView && (
            <button onClick={() => onQuickView(product)} aria-label="Quick view">
              <Eye size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <Link to={`/shop/${product.id}`}><h3>{product.name}</h3></Link>
        <div className="product-card-rating">
          <Star size={13} className="star-filled" />
          <span>{product.rating}</span>
          <span className="review-count">({product.reviewCount})</span>
        </div>
        <div className="product-card-price">
          <strong>{inr(product.price)}</strong>
          {product.mrp && <s>{inr(product.mrp)}</s>}
        </div>
        <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
          <button className="product-card-add-btn" onClick={() => add(product)} disabled={!product.inStock} style={{ flex: 1 }}>
            <ShoppingCart size={15} />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
          <button className="product-card-buy-btn" onClick={handleBuyNow} disabled={!product.inStock} style={{ flex: 1, background: 'linear-gradient(135deg, #00ff88 0%, #00e5ff 100%)', color: '#000', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.3s ease', opacity: product.inStock ? 1 : 0.5 }}>
            <Zap size={15} />
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
