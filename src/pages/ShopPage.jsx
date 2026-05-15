import React, { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Filter, Grid2X2, List,
  Minus, Package, Plus, Search, SlidersHorizontal, Truck, X, Zap
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAdminStore from "../stores/useAdminStore";
import useCartStore from "../stores/useCartStore";
import useCompareStore from "../stores/useCompareStore";
import ProductCard from "../components/common/ProductCard";
import { categories, inr } from "../config/constants";
import motorDriver from "../assets/motor-driver.jpg";
import carousel1 from "../assets/team/crausel 1.png";
import robotUnit003 from "../assets/robot-unit-003.jpg";
import cyberAndroid from "../assets/cyber-android.jpg";
import StarRating from "../components/common/StarRating";

function QuickViewModal({ product, onClose }) {
  const add = useCartStore((s) => s.add);
  const [qty, setQty] = useState(1);
  if (!product) return null;
  return (
    <AnimatePresence>
      <motion.div className="qv-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div className="qv-modal glass-card" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
          <button className="qv-close" onClick={onClose}><X size={20} /></button>
          <div className="qv-body">
            <div className="qv-image"><img src={product.imageUrl || motorDriver} alt={product.name} /></div>
            <div className="qv-info">
              <h2>{product.name}</h2>
              <p className="sku">{product.sku}</p>
              <div className="rating-row"><StarRating rating={product.rating} /><span>({product.reviewCount})</span></div>
              <div className="price-row"><strong>{inr(product.price)}</strong>{product.mrp && <s className="mrp">{inr(product.mrp)}</s>}</div>
              <p className="qv-desc">{product.shortDescription}</p>
              <div className="qty-selector">
                <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}><Plus size={16} /></button>
              </div>
              <button className="add-quote-btn full" onClick={() => { for (let i = 0; i < qty; i++) add(product); onClose(); }}>Add to Quote</button>
              <Link to={`/shop/${product.id}`} className="qv-detail-link" onClick={onClose}>View Full Details →</Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CompareBar({ products }) {
  const { ids, clear } = useCompareStore();
  const navigate = useNavigate();
  const items = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  if (items.length < 2) return null;
  return (
    <motion.div className="compare-bar glass-card" initial={{ y: 80 }} animate={{ y: 0 }}>
      <div className="compare-items">{items.map((p) => <div key={p.id} className="compare-item"><img src={p.imageUrl || motorDriver} alt={p.name} /><span>{p.name}</span></div>)}</div>
      <div className="compare-actions">
        <button className="btn" onClick={() => navigate("/shop/compare")}>Compare Now</button>
        <button className="btn ghost" onClick={clear}>Clear</button>
      </div>
    </motion.div>
  );
}

function ShopSection() {
  const products = useAdminStore((s) => s.products);
  const loadProducts = useAdminStore((s) => s.loadProducts);
  const productsLoaded = useAdminStore((s) => s.productsLoaded);
  const defaultFilters = { category: "All", priceMin: "", priceMax: "", minRating: 0, compat: [], inStockOnly: false, deliveryType: "all" };
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [qvProduct, setQvProduct] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    { image: carousel1, title: "A5X ROBOTICS KIT", subtitle: "Complete Kit with Servo, Sensors & Motors", tag: "FEATURED KIT" },
    { image: robotUnit003, title: "PREMIUM COMPONENTS", subtitle: "High-Quality Microcontrollers & Modules", tag: "BEST SELLERS" },
    { image: cyberAndroid, title: "BUILD & INNOVATE", subtitle: "Everything You Need for Your Next Project", tag: "NEW ARRIVALS" }
  ];

  useEffect(() => { loadProducts(); }, []);
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const filtered = useMemo(() => {
    let r = [...products];
    if (searchQuery.trim()) r = r.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()) || (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())));
    if (filters.category !== "All") r = r.filter((p) => p.category === filters.category);
    if (filters.priceMin) r = r.filter((p) => p.price >= Number(filters.priceMin));
    if (filters.priceMax) r = r.filter((p) => p.price <= Number(filters.priceMax));
    if (filters.minRating) r = r.filter((p) => p.rating >= filters.minRating);
    if (filters.inStockOnly) r = r.filter((p) => p.inStock);
    if (filters.compat.length) r = r.filter((p) => p.compatibility?.some((c) => filters.compat.includes(c)));
    if (filters.deliveryType === "quick") r = r.filter((p) => p.quickDelivery === true);
    if (filters.deliveryType === "scheduled") r = r.filter((p) => p.quickDelivery !== true);
    if (sort === "price-asc") r.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") r.sort((a, b) => b.price - a.price);
    else if (sort === "rating") r.sort((a, b) => b.rating - a.rating);
    else if (sort === "newest") r.sort((a, b) => b.id.localeCompare(a.id));
    return r;
  }, [products, filters, sort, searchQuery]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, filtered.length);

  return (
    <div className="shop-page-redesign">
      {/* Hero Carousel */}
      <div className="shop-hero-carousel">
        <div className="shop-hero-slides">
          {heroSlides.map((slide, index) => (
            <div key={index} className={`shop-hero-slide ${index === currentSlide ? "active" : ""}`} style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="shop-hero-overlay" />
              <div className="shop-hero-content">
                <span className="shop-hero-tag">{slide.tag}</span>
                <h1 className="shop-hero-title">{slide.title}</h1>
                <p className="shop-hero-subtitle">{slide.subtitle}</p>
                <button className="shop-hero-btn" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
                  Shop Now <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="shop-hero-indicators">
          {heroSlides.map((_, index) => (
            <button key={index} className={`shop-hero-indicator ${index === currentSlide ? "active" : ""}`} onClick={() => setCurrentSlide(index)} aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>
        <button className="shop-hero-nav shop-hero-nav-prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide"><ChevronLeft size={32} /></button>
        <button className="shop-hero-nav shop-hero-nav-next" onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)} aria-label="Next slide"><ChevronRight size={32} /></button>
      </div>

      {/* Search + Categories */}
      <div className="shop-search-section">
        <div className="shop-search-bar-wrapper">
          <div className="shop-search-input-wrap">
            <Search size={20} className="shop-search-icon" />
            <input type="text" className="shop-search-input" placeholder="Search products, categories, SKUs..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} />
            {searchQuery && <button className="shop-search-clear" onClick={() => { setSearchQuery(""); setPage(1); }} aria-label="Clear search"><X size={18} /></button>}
          </div>
        </div>
        <div className="shop-category-pills">
          {categories.map((cat) => (
            <button key={cat} className={`shop-cat-pill ${filters.category === cat ? "active" : ""}`} onClick={() => { setFilters({ ...filters, category: cat }); setPage(1); }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="shop-body">
        <aside className={`shop-sidebar-new ${showMobileFilter ? "open" : ""}`}>
          <div className="shop-sidebar-header">
            <span className="shop-sidebar-title"><SlidersHorizontal size={16} /> Filters</span>
            <button className="shop-sidebar-clear" onClick={() => { setFilters(defaultFilters); setPage(1); }}>Clear All</button>
          </div>
          <div className="shop-filter-group">
            <p className="shop-filter-label">PRICE RANGE</p>
            <div className="shop-price-inputs">
              <input type="number" placeholder="Min ₹" value={filters.priceMin} onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })} />
              <span>—</span>
              <input type="number" placeholder="Max ₹" value={filters.priceMax} onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })} />
            </div>
          </div>
          <div className="shop-filter-group">
            <p className="shop-filter-label">MIN RATING</p>
            <div className="shop-rating-btns">
              {[0, 3, 4, 4.5].map((r) => (
                <button key={r} className={`shop-rating-btn ${filters.minRating === r ? "active" : ""}`} onClick={() => setFilters({ ...filters, minRating: r })}>{r === 0 ? "All" : `${r}★+`}</button>
              ))}
            </div>
          </div>
          <div className="shop-filter-group">
            <label className="shop-toggle-label">
              <span>In Stock Only</span>
              <div className={`shop-toggle ${filters.inStockOnly ? "on" : ""}`} onClick={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}>
                <div className="shop-toggle-knob" />
              </div>
            </label>
          </div>
          <div className="shop-filter-group">
            <p className="shop-filter-label">DELIVERY OPTIONS</p>
            <div className="shop-delivery-btns">
              <button className={`shop-delivery-btn ${filters.deliveryType === "all" ? "active" : ""}`} onClick={() => setFilters({ ...filters, deliveryType: "all" })}><Truck size={16} /> All</button>
              <button className={`shop-delivery-btn ${filters.deliveryType === "quick" ? "active" : ""}`} onClick={() => setFilters({ ...filters, deliveryType: "quick" })}><Zap size={16} /> Quick (1 Day)</button>
              <button className={`shop-delivery-btn ${filters.deliveryType === "scheduled" ? "active" : ""}`} onClick={() => setFilters({ ...filters, deliveryType: "scheduled" })}><Package size={16} /> Scheduled (1 Week)</button>
            </div>
          </div>
          <button className="shop-sidebar-close-btn" onClick={() => setShowMobileFilter(false)}><X size={18} /> Close Filters</button>
        </aside>
        {showMobileFilter && <div className="shop-filter-overlay" onClick={() => setShowMobileFilter(false)} />}

        <div className="shop-products-area">
          <div className="shop-toolbar">
            <div className="shop-toolbar-left">
              <button className="shop-filter-toggle-btn" onClick={() => setShowMobileFilter(true)}><Filter size={16} /> Filters</button>
              <span className="shop-count-text">Showing <strong>{start}–{end}</strong> of <strong>{filtered.length}</strong> products</span>
            </div>
            <div className="shop-toolbar-right">
              <select className="shop-sort-select" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low–High</option>
                <option value="price-desc">Price: High–Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <select className="shop-sort-select" value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
                <option value={12}>12 / page</option>
                <option value={24}>24 / page</option>
                <option value={48}>48 / page</option>
              </select>
              <div className="shop-view-btns">
                <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}><Grid2X2 size={16} /></button>
                <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}><List size={16} /></button>
              </div>
            </div>
          </div>

          {!productsLoaded && products.length === 0 ? (
            <div className="shop-loading-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="shop-skeleton-card">
                  <div className="skeleton-img" /><div className="skeleton-line" style={{width:'70%'}} /><div className="skeleton-line" style={{width:'40%'}} /><div className="skeleton-line" style={{width:'55%'}} />
                </div>
              ))}
            </div>
          ) : paged.length === 0 ? (
            <div className="shop-empty">
              <Search size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
              <h3>No products found</h3>
              <p>Try adjusting your filters</p>
              <button className="btn" onClick={() => { setFilters(defaultFilters); setPage(1); }}>Clear Filters</button>
            </div>
          ) : (
            <div className={view === "grid" ? "shop-products-grid" : "shop-products-list"}>
              {paged.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQvProduct} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="shop-pagination">
              <button className="shop-page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft size={16} /></button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`shop-page-btn ${page === i + 1 ? "active" : ""}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className="shop-page-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}><ChevronRight size={16} /></button>
            </div>
          )}
        </div>
      </div>

      <CompareBar products={products} />
      {qvProduct && <QuickViewModal product={qvProduct} onClose={() => setQvProduct(null)} />}
    </div>
  );
}

function ShopPage() {
  return <main className="shop-page-main"><ShopSection /></main>;
}

export { ShopSection };
export default ShopPage;
