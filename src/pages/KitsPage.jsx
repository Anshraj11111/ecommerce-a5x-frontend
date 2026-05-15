import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight, Play, PlayCircle, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useAdminStore from "../stores/useAdminStore";
import useCartStore from "../stores/useCartStore";
import ButtonLink from "../components/common/ButtonLink";
import KitCard from "../components/common/KitCard";
import { inr } from "../config/constants";
import a5xCarKit from "../assets/a5x-car-kit.jpg";
import kitInnovation from "../assets/kit-innovation.jpg";
import robotHands from "../assets/robot-hands.jpg";

function KitsSection() {
  const kits = useAdminStore((state) => state.kits);
  const loadKits = useAdminStore((state) => state.loadKits);

  useEffect(() => { loadKits(); }, []);

  return (
    <section className="kits-section neon-kits" id="kits">
      <div className="kits-premium-hero">
        <img className="kits-hero-art" src={kitInnovation} alt="" />
        <div className="kits-hero-overlay" />
        <div className="kits-hero-content">
          <p className="eyebrow">A5X ROBOTICS</p>
          <h1>PREMIUM<br /><em>ROBOTICS</em> KITS</h1>
          <p className="kits-hero-sub">Engineered for builders. Every component matched, tested, and documented for real-world robotics.</p>
          <div className="kits-hero-stats">
            <div className="glass-card"><strong>{kits.length}</strong><span>Kits Available</span></div>
            <div className="glass-card"><strong>100%</strong><span>Tested & Matched</span></div>
            <div className="glass-card"><strong>24hr</strong><span>Dispatch Time</span></div>
          </div>
        </div>
      </div>
      <div className="kits-grid">{kits.map((kit) => <KitCard key={kit.id} kit={kit} />)}</div>
      <div className="custom-kit">
        <img src={robotHands} alt="" />
        <div>
          <h3>Need a custom kit?</h3>
          <p>Tell us your build goal, classroom size, or competition spec. We will bundle the right components.</p>
          <ButtonLink to="/contact">Request Custom Build</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function KitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const kits = useAdminStore((state) => state.kits);
  const kit = kits.find((k) => k.id === id);
  const add = useCartStore((state) => state.add);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [dragStart, setDragStart] = useState(null);

  const galleryImages = kit?.images && kit.images.length > 0
    ? kit.images
    : kit?.imageUrl ? [kit.imageUrl] : [a5xCarKit];

  useEffect(() => {
    const t = setInterval(() => setActiveSlide((s) => (s + 1) % galleryImages.length), 3000);
    return () => clearInterval(t);
  }, [galleryImages.length]);

  const nextSlide = () => setActiveSlide((s) => (s + 1) % galleryImages.length);
  const prevSlide = () => setActiveSlide((s) => (s - 1 + galleryImages.length) % galleryImages.length);

  const handleMouseDown = (e) => setDragStart(e.clientX);
  const handleMouseUp = (e) => {
    if (dragStart === null) return;
    const diff = e.clientX - dragStart;
    if (Math.abs(diff) > 50) { diff > 0 ? prevSlide() : nextSlide(); }
    setDragStart(null);
  };
  const handleTouchStart = (e) => setDragStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (dragStart === null) return;
    const diff = e.changedTouches[0].clientX - dragStart;
    if (Math.abs(diff) > 50) { diff > 0 ? prevSlide() : nextSlide(); }
    setDragStart(null);
  };

  if (!kit) return (
    <main className="page">
      <section style={{ textAlign: 'center', paddingTop: '120px' }}>
        <h1>Kit Not Found</h1>
        <button className="btn" onClick={() => navigate('/kits')}>Back to Kits</button>
      </section>
    </main>
  );

  const hasVideo = kit.videoUrl && kit.videoUrl.trim() !== '';
  const navBtnStyle = { position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,229,255,0.9)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, color: '#000' };

  return (
    <main className="page kit-detail-page">
      <section className="kit-detail-hero">
        <div className="kit-detail-gallery" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ cursor: dragStart !== null ? 'grabbing' : 'grab', userSelect: 'none' }}>
          <AnimatePresence mode="wait">
            <motion.img key={activeSlide} src={galleryImages[activeSlide]} alt={kit.name} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} draggable={false} />
          </AnimatePresence>
          <button onClick={prevSlide} style={{ ...navBtnStyle, left: '20px' }}><ChevronLeft size={28} /></button>
          <button onClick={nextSlide} style={{ ...navBtnStyle, right: '20px' }}><ChevronRight size={28} /></button>
          <div className="kit-gallery-dots">
            {galleryImages.slice(0, 8).map((_, i) => <button key={i} className={i === activeSlide % 8 ? 'active' : ''} onClick={() => setActiveSlide(i)} />)}
          </div>
          <div className="kit-gallery-glow" />
          {hasVideo && (
            <button className="kit-video-play-btn" onClick={() => setShowVideo(true)} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
              <Play size={32} style={{ marginLeft: '4px' }} />
            </button>
          )}
        </div>

        <div className="kit-detail-info">
          <span className={`tier ${kit.tier.toLowerCase().split(' ')[0]}`}>{kit.tier}</span>
          <h1>{kit.name}</h1>
          <p className="kit-detail-desc">{kit.description}</p>
          <div className="kit-detail-price">{inr(Number(kit.price))}</div>
          <div className="kit-detail-rating">{'★'.repeat(Math.round(kit.rating))} <span>{kit.rating}/5</span></div>
          {hasVideo && (
            <button className="btn ghost" onClick={() => setShowVideo(true)} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PlayCircle size={20} /> Watch Demo Video
            </button>
          )}
          <h3>What's Included</h3>
          <div className="kit-detail-includes">
            {kit.includes.map((item) => <div key={item} className="glass-card"><CheckCircle size={16} />{item}</div>)}
          </div>
          <button className="btn" onClick={() => add({ ...kit, category: 'Kits', sku: kit.tier })} style={{ marginBottom: '1rem' }}>
            Add to Cart — {inr(Number(kit.price))}
          </button>
          <ButtonLink to="/contact" ghost>Request Custom Version</ButtonLink>
        </div>
      </section>

      {hasVideo && (
        <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center', color: '#00e5ff' }}>Kit Demo Video</h2>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,229,255,0.3)' }}>
            <video controls style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}>
              <source src={kit.videoUrl} type="video/mp4" />
            </video>
          </div>
        </section>
      )}

      <AnimatePresence>
        {showVideo && hasVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowVideo(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '1200px', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
              <button onClick={() => setShowVideo(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
                <X size={24} />
              </button>
              <video controls autoPlay style={{ width: '100%', height: 'auto', display: 'block' }}>
                <source src={kit.videoUrl} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function KitsPage() {
  return <main className="kits-page-wrap"><KitsSection /></main>;
}

export { KitsSection, KitDetailPage };
export default KitsPage;
