import React from "react";
import { Link } from "react-router-dom";
import { Check, Truck } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer-pro">
      <div className="footer-glow-line" />
      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="footer-logo-text">A5X</span>
            <span className="footer-logo-sub">ROBOTICS</span>
          </div>
          <p className="footer-brand-desc">
            Premium robotics components, kits, and courses for engineers, students, and makers. Building the future, one circuit at a time.
          </p>
          <div className="footer-social-row">
            <a href="https://www.instagram.com/a5x.in/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://www.youtube.com/@A5x_in" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/a5x-industries/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
          <div className="footer-badge-row">
            <span className="footer-badge"><Check size={12} /> Secure Payments</span>
            <span className="footer-badge"><Truck size={12} /> Fast Dispatch</span>
          </div>
        </div>

        {/* Products Column */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Products</h4>
          <ul className="footer-link-list">
            <li><Link to="/shop?cat=MicroController">Microcontrollers</Link></li>
            <li><Link to="/shop?cat=Sensor">Sensors</Link></li>
            <li><Link to="/shop?cat=Motors">Motors</Link></li>
            <li><Link to="/shop?cat=Motor+Driver">Motor Drivers</Link></li>
            <li><Link to="/shop?cat=Display">Displays</Link></li>
            <li><Link to="/shop?cat=Battery">Batteries</Link></li>
            <li><Link to="/kits">Robotics Kits</Link></li>
          </ul>
        </div>

        {/* Learn Column */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Learn</h4>
          <ul className="footer-link-list">
            <li><Link to="/learn">All Courses</Link></li>
            <li><Link to="/learn">Beginner Guides</Link></li>
            <li><Link to="/learn">Arduino Tutorials</Link></li>
            <li><Link to="/learn">ESP32 Projects</Link></li>
            <li><Link to="/learn">Robotics Academy</Link></li>
            <li><Link to="/learn">IoT & Cloud</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-link-list">
            <li><Link to="/about">About A5X</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/contact">Shipping Policy</Link></li>
            <li><Link to="/contact">Return Policy</Link></li>
            <li><Link to="/contact">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-newsletter-col">
          <h4 className="footer-col-title">Stay Updated</h4>
          <p className="footer-newsletter-desc">Get new product launches, tutorials, and exclusive deals.</p>
          <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="footer-contact-info">
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📧</span>
              <a href="mailto:a5x.industries@gmail.com" style={{color:'inherit',textDecoration:'none'}}>a5x.industries@gmail.com</a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📱</span>
              <a href="tel:+918269858259" style={{color:'inherit',textDecoration:'none'}}>+91 82698 58259</a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📱</span>
              <a href="tel:+919340212224" style={{color:'inherit',textDecoration:'none'}}>+91 93402 12224</a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📍</span>
              <span>India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            © {currentYear} <strong>A5X Industries</strong>. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/contact">Terms of Service</Link>
            <span className="footer-dot" />
            <Link to="/contact">Privacy Policy</Link>
            <span className="footer-dot" />
            <Link to="/contact">Cookie Policy</Link>
          </div>
          <p className="footer-made-with">
            Made with <span style={{color:'#ef4444'}}>♥</span> for makers
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
