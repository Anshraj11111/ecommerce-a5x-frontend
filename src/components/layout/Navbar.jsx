import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown, ChevronRight, Heart, LogOut, Menu, Search, ShoppingCart, User, X
} from "lucide-react";
import useCartStore from "../../stores/useCartStore";
import useWishlistStore from "../../stores/useWishlistStore";
import useAuthStore from "../../stores/useAuthStore";
import useAuthModalStore from "../../stores/useAuthModalStore";
import { useScrolled } from "../../hooks/useScrolled";

function Navbar() {
  const scrolled = useScrolled();
  const [mobile, setMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.qty, 0));
  const wishCount = useWishlistStore((state) => state.ids.length);
  const toggle = useCartStore((state) => state.toggle);
  const cartOpen = useCartStore((state) => state.open);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { open: openAuthModal } = useAuthModalStore();

  // Check if current page is wishlist or shop
  const isWishlistPage = location.pathname === '/wishlist';
  const isShopPage = location.pathname === '/shop';

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop", dropdown: ["All Products", "Microcontrollers", "Sensors", "Motor Drivers"] },
    { label: "Kits", to: "/kits", dropdown: ["Starter Kit", "Pro Kits", "Elite Kits"] },
   
    { label: "Learn", to: "/learn", dropdown: ["All Courses", "Robotics", "IoT"] },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) { navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`); setMobile(false); }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavClick = (e, to) => {
    if (to !== '/' && !isAuthenticated) {
      e.preventDefault();
      openAuthModal(to);
    }
  };

  return (
    <>
      <header className={`nav-v2 ${scrolled ? "is-scrolled" : ""} ${cartOpen ? "hide-on-mobile" : ""} ${isWishlistPage || isShopPage ? "wishlist-nav-dark" : ""}`}>
        <Link className="nav-v2-logo" to="/" onClick={() => setMobile(false)}>
          <span>A5X</span><small>ROBOTICS</small>
        </Link>
        <nav className="nav-v2-links">
          {navItems.map(({ label, to, dropdown }) => (
            <div key={label} className={`nav-v2-item ${dropdown ? "has-dropdown" : ""}`}>
              <NavLink className={({ isActive }) => `nav-v2-link ${isActive ? "active" : ""}`} to={to} onClick={(e) => handleNavClick(e, to)}>
                {label}{dropdown && <ChevronDown size={13} className="nav-v2-chevron" />}
              </NavLink>
              {dropdown && (
                <div className="nav-v2-dropdown">
                  {dropdown.map((item) => (
                    <Link key={item} className="nav-v2-dropdown-item" to={to} onClick={(e) => handleNavClick(e, to)}>{item}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="nav-v2-actions">
          <button className="nav-v2-action-btn" onClick={() => navigate('/wishlist')} aria-label="Wishlist">
            <Heart size={18} /><span>Wishlist</span>
            {wishCount > 0 && <b className="nav-v2-badge">{wishCount}</b>}
          </button>
          <button className="nav-v2-action-btn" onClick={toggle} aria-label="Cart">
            <ShoppingCart size={18} /><span>Cart</span>
            {count > 0 && <b className="nav-v2-badge">{count}</b>}
          </button>
          {isAuthenticated ? (
            <button className="nav-v2-action-btn" onClick={handleLogout} aria-label="Logout" title="Logout">
              <LogOut size={18} /><span>Logout</span>
            </button>
          ) : (
            <button className="nav-v2-action-btn" onClick={() => navigate('/login')} aria-label="Login">
              <User size={18} /><span>Login</span>
            </button>
          )}
          <button className="icon-btn mobile-only" onClick={() => setMobile(true)} aria-label="Open menu" aria-expanded={mobile}>
            <Menu size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobile && (
          <motion.div className="mobile-menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <motion.div className="mobile-menu-backdrop" onClick={() => setMobile(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div className="mobile-menu-panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}>
              <div className="mobile-menu-header">
                <Link className="logo" to="/" onClick={() => setMobile(false)}><span>A5X</span><small>ROBOTICS</small></Link>
                <button className="mobile-menu-close" onClick={() => setMobile(false)} aria-label="Close menu"><X size={22} /></button>
              </div>
              <form className="mobile-search" onSubmit={handleSearch}>
                <Search size={15} />
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </form>
              <nav className="mobile-menu-nav">
                {navItems.map(({ label, to }, index) => (
                  <motion.div key={label} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.05 + 0.1 }}>
                    <NavLink className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} to={to} onClick={() => setMobile(false)}>
                      <span className="mobile-nav-label">{label}</span>
                      <ChevronRight size={16} className="mobile-nav-arrow" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <motion.div className="mobile-menu-footer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <button className="btn" onClick={() => { toggle(); setMobile(false); }} style={{ width: '100%', justifyContent: 'center' }}>
                  <ShoppingCart size={16} /> Cart {count > 0 && `(${count})`}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
