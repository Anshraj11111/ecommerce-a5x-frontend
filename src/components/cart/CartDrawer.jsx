import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, X } from "lucide-react";
import useCartStore from "../../stores/useCartStore";
import { inr } from "../../config/constants";
import a5xCarKit from "../../assets/a5x-car-kit.jpg";

function CartDrawer() {
  const navigate = useNavigate();
  const { open, items, toggle, inc, dec, remove, subtotal } = useCartStore();

  const handleCheckout = () => {
    toggle();
    navigate('/checkout');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggle();
    }
  };

  const handleBack = () => {
    toggle();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9998, backdropFilter: 'none', WebkitBackdropFilter: 'none' }}
          />
          <motion.aside
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{ zIndex: 9999, background: '#0d1621', opacity: 1 }}
          >
            <div className="cart-header">
              <button className="icon-btn back-btn" onClick={handleBack} aria-label="Go back">
                <ArrowLeft size={20} />
              </button>
              <h2>Cart</h2>
              <button className="icon-btn close" onClick={toggle}>
                <X />
              </button>
            </div>
            <div className="cart-items">
              {items.length === 0 && <p className="empty-cart">Your cart is empty.</p>}
              {items.map((item) => (
                <div className="cart-line" key={item.id}>
                  <div className="cart-line-top">
                    <img src={item.imageUrl || a5xCarKit} alt={item.name} />
                    <div className="cart-item-details">
                      <b>{item.name}</b>
                      <p className="cart-item-price">{inr(Number(item.price))}</p>
                    </div>
                    <button className="icon-btn remove-btn" onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`} title="Remove from cart">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="cart-line-bottom">
                    <div className="qty-control">
                      <button onClick={() => dec(item.id)} aria-label={`Decrease ${item.name}`}>
                        <Minus size={14} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => inc(item.id)} aria-label={`Increase ${item.name}`}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <footer>
              <p>Subtotal <strong>{inr(subtotal())}</strong></p>
              <button className="btn" disabled={!items.length} onClick={handleCheckout}>Checkout</button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
