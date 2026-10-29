import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown, ChevronRight, Heart, LogOut, Menu, Search, ShoppingCart, User, X, Package, Settings
} from "lucide-react";
import useCartStore from "../../stores/useCartStore";
import useWishlistStore from "../../stores/useWishlistStore";
import useAuthStore from "../../stores/useAuthStore";
import { useScrolled } from "../../hooks/useScrolled";

function Navbar() {
  const scrolled = useScrolled();
  const [mobile, setMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.qty, 0));
  const wishCount = useWishlistStore((state) => state.ids.length);
  const toggle = useCartStore((state) => state.toggle);
  const cartOpen = useCartStore((state) => state.open);
  const { isAuthenticated, user, logout } = useAuthStore();

  // Check if current page is wishlist or shop
  const isWishlistPage = location.pathname === '/wishlist';
  const isShopPage = location.pathname === '/shop';

  const navItems = [
    { label: "Home", to: "/" },
    {
      label: "Shop", to: "/shop",
      dropdown: [
        { label: "All Products", to: "/shop" },
        { label: "Microcontrollers", to: "/shop?cat=MicroController" },
        { label: "Sensors", to: "/shop?cat=Sensor" },
        { label: "Motor Drivers", to: "/shop?cat=Motor Driver" },
      ]
    },
    {
      label: "Kits", to: "/kits",
      dropdown: [
        { label: "All Kits", to: "/kits" },
        { label: "Starter Kit", to: "/kits?tier=starter" },
        { label: "Pro Kits", to: "/kits?tier=pro" },
        { label: "Elite Kits", to: "/kits?tier=elite" },
      ]
    },
    {
      label: "Learn", to: "/learn",
      dropdown: [
        { label: "All Courses", to: "/learn" },
        { label: "Robotics", to: "/learn?cat=Robotics" },
        { label: "IoT", to: "/learn?cat=IoT" },
      ]
    },
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
    setUserMenuOpen(false);
    navigate('/');
  };

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className={`nav-v2 ${scrolled ? "is-scrolled" : ""} ${cartOpen ? "hide-on-mobile" : ""} ${isWishlistPage || isShopPage ? "wishlist-nav-dark" : ""}`}>
        <Link className="nav-v2-logo" to="/" onClick={() => setMobile(false)}>
          <span>A5X</span><small>ROBOTICS</small>
        </Link>
        <nav className="nav-v2-links">
          {navItems.map(({ label, to, dropdown }) => (
            <div key={label} className={`nav-v2-item ${dropdown ? "has-dropdown" : ""}`}>
              <NavLink className={({ isActive }) => `nav-v2-link ${isActive ? "active" : ""}`} to={to}>
                {label}{dropdown && <ChevronDown size={13} className="nav-v2-chevron" />}
              </NavLink>
              {dropdown && (
                <div className="nav-v2-dropdown">
                  {dropdown.map((item) => (
                    <Link key={item.label} className="nav-v2-dropdown-item" to={item.to}>{item.label}</Link>
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
            <div style={{ position: 'relative' }} ref={userMenuRef}>
              <button 
                className="nav-v2-action-btn" 
                onClick={() => setUserMenuOpen(!userMenuOpen)} 
                aria-label="User menu" 
                title="User menu"
                style={{ position: 'relative' }}
              >
                <User size={18} /><span>{user?.name || user?.username || 'Profile'}</span>
                <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    className="user-dropdown-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      top: '110%',
                      right: 0,
                      background: 'rgba(13, 22, 33, 0.98)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 12,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                      minWidth: 200,
                      zIndex: 9999,
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{user?.name || user?.username}</div>
                      <div style={{ fontSize: 12, opacity: 0.6 }}>{user?.email}</div>
                    </div>
                    <button
                      onClick={() => { navigate('/orders'); setUserMenuOpen(false); }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        fontSize: 14,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <Package size={16} />
                      <span>My Orders</span>
                    </button>
                    <button
                      onClick={() => { navigate('/profile'); setUserMenuOpen(false); }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        fontSize: 14,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <Settings size={16} />
                      <span>Profile Settings</span>
                    </button>
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: 14,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
