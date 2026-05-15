import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Eye, Heart, Plus, ShoppingCart, Star, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../stores/useAdminStore";
import useWishlistStore from "../stores/useWishlistStore";
import useCartStore from "../stores/useCartStore";
import { inr } from "../config/constants";
import motorDriver from "../assets/motor-driver.jpg";

function WishlistPage() {
  const products = useAdminStore((state) => state.products);
  const wishlistIds = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const addToCart = useCartStore((state) => state.add);
  const navigate = useNavigate();

  const wishlistProducts = products.filter((product) => wishlistIds.includes(product.id));

  if (wishlistIds.length === 0) {
    return (
      <main className="wishlist-page-premium">
        <div className="wishlist-empty-state">
          <div className="wishlist-empty-icon">
            <Heart size={80} strokeWidth={1.5} />
          </div>
          <h2 className="wishlist-empty-title">Your Wishlist is Empty</h2>
          <p className="wishlist-empty-desc">Discover amazing robotics products and save your favorites here</p>
          <button className="wishlist-empty-btn" onClick={() => navigate('/shop')}>
            <ShoppingCart size={18} /> Explore Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="wishlist-page-premium">
      <div className="wishlist-hero">
        <div className="wishlist-hero-content">
          <div className="wishlist-hero-icon"><Heart size={32} fill="currentColor" /></div>
          <div>
            <h1 className="wishlist-hero-title">My Wishlist</h1>
            <p className="wishlist-hero-subtitle">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
        </div>
        <button className="wishlist-hero-shop-btn" onClick={() => navigate('/shop')}>
          <Plus size={18} /> Add More
        </button>
      </div>

      <div className="wishlist-container">
        <div className="wishlist-grid">
          {wishlistProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="wishlist-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="wishlist-card-image-wrapper">
                <div
                  className="wishlist-card-image"
                  style={{ backgroundImage: `url(${product.imageUrl || motorDriver})` }}
                >
                  {product.badges?.map((badge) => (
                    <span key={badge} className="wishlist-card-badge">{badge}</span>
                  ))}
                  <button
                    className="wishlist-card-remove"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Remove from wishlist"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="wishlist-card-body">
                <div className="wishlist-card-category">{product.category}</div>
                <h3 className="wishlist-card-name">{product.name}</h3>

                <div className="wishlist-card-rating">
                  <div className="wishlist-card-stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth={1.5} />
                    ))}
                  </div>
                  <span className="wishlist-card-rating-text">{product.rating} ({product.reviewCount})</span>
                </div>

                <div className="wishlist-card-price-row">
                  <div className="wishlist-card-price-group">
                    <span className="wishlist-card-price">{inr(product.price)}</span>
                    {product.mrp && (
                      <>
                        <span className="wishlist-card-mrp">{inr(product.mrp)}</span>
                        <span className="wishlist-card-discount">
                          {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {product.inStock ? (
                  <div className="wishlist-card-stock in-stock"><CheckCircle size={14} /> In Stock</div>
                ) : (
                  <div className="wishlist-card-stock out-of-stock"><X size={14} /> Out of Stock</div>
                )}

                <div className="wishlist-card-actions">
                  <button
                    className="wishlist-card-btn-primary"
                    onClick={() => { addToCart(product); toggleWishlist(product.id); }}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                  <button className="wishlist-card-btn-secondary" onClick={() => navigate(`/shop/${product.id}`)}>
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default WishlistPage;
