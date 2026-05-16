import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, CheckCircle, CircuitBoard, Cpu, Package, Rocket, ShoppingCart, Star, Truck } from "lucide-react";
import useAdminStore from "../stores/useAdminStore";
import ButtonLink from "../components/common/ButtonLink";
import { CourseMiniCard } from "../components/common/CourseCards";
import useCountUp from "../hooks/useCountUp";
import aboutArc from "../assets/about-arc.jpg";
import darkSpheres from "../assets/dark-spheres.jpg";
import heroCarRobot from "../assets/ChatGPT Image May 5, 2026, 10_52_52 AM.png";
import motorDriver from "../assets/motor-driver.jpg";
import unit003Hero from "../assets/team/unit003.jpeg";
import holoPrism from "../assets/holo-prism.png";
import silhouetteFigure from "../assets/silhouette-figure.png";
import cyberAndroid from "../assets/cyber-android.jpg";
import robotHands from "../assets/robot-hands.jpg";
import futureBg from "../assets/team/future-bg.jpg";
import robotModel from "../assets/team/robot-model.png";

const scrollReveal = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [.22,1,.36,1] } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

function Hero() {
  return (
    <section className="hero-v4" style={{ '--hero-bg': `url(${futureBg})` }}>
      <div className="hero-copy-v4" aria-hidden="true">
        <span className="future-text">FUTURE</span>
        <span className="vision-text">VISION</span>
      </div>
      <section className="shop-panel-v4" aria-label="A5X Robotics shopping actions">
        <p>Premium robotics kits, components, and courses for builders who want to create something real.</p>
        <div className="shop-actions-v4">
          <Link to="/shop" className="shop-primary-v4">Shop Now</Link>
          <Link to="/kits" className="shop-secondary-v4">Explore Kits</Link>
        </div>
      </section>
      <figure className="model-wrap-v4">
        <img src={robotModel} alt="Futuristic black robotic model with glowing blue lenses" />
      </figure>
      <aside className="callout-v4 callout-left-v4" aria-label="Robotics kit note">
        <div className="thumb-v4"><img src={robotModel} alt="" /></div>
        <p>PREMIUM<br />ROBOTICS<br />KITS</p>
      </aside>
      <aside className="callout-v4 callout-right-v4" aria-label="Future vision note">
        <p>NEXT GEN<br />FUTURE<br />VISION</p>
        <div className="thumb-v4"><img src={robotModel} alt="" /></div>
      </aside>
      <aside className="rating-badge-v4" aria-label="Rated number one robotics store in India">
        <span>Rated #1 Robotics Store in India</span>
      </aside>
      <span className="node-v4 node-left-v4" aria-hidden="true"></span>
      <span className="node-v4 node-right-v4" aria-hidden="true"></span>
      <div className="line-v4 line-left-v4" aria-hidden="true"></div>
      <div className="line-v4 line-right-v4" aria-hidden="true"></div>
      <Link to="/shop" className="buy-v4">Shop Now</Link>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: <Truck size={22} />, title: "Free Shipping", sub: "On all orders above ₹999" },
    { icon: <CheckCircle size={22} />, title: "Secure Payments", sub: "100% secure & trusted" },
    { icon: <Package size={22} />, title: "7 Days Return", sub: "Hassle free returns" },
    { icon: <ShoppingCart size={22} />, title: "24/7 Support", sub: "We're here to help" },
  ];
  return (
    <section className="trust-bar-v2">
      {items.map(({ icon, title, sub }) => (
        <div key={title} className="trust-bar-v2-item">
          <span className="trust-bar-v2-icon">{icon}</span>
          <div><strong>{title}</strong><span>{sub}</span></div>
        </div>
      ))}
    </section>
  );
}

function PopularCategories() {
  const cats = [
    { label: "Robotics Kits", sub: "Build. Experiment. Innovate.", img: heroCarRobot, to: "/kits" },
    { label: "Microcontrollers", sub: "Power your ideas.", img: motorDriver, to: "/shop" },
    { label: "Sensors", sub: "Sense. Measure. Act.", img: motorDriver, to: "/shop" },
    { label: "Motors & Drivers", sub: "Move your projects.", img: motorDriver, to: "/shop" },
    { label: "Tools & Accessories", sub: "Everything you need.", img: motorDriver, to: "/shop" },
  ];
  return (
    <section className="popular-cats">
      <div className="popular-cats-header">
        <div>
          <p className="popular-cats-eyebrow">BROWSE CATEGORIES</p>
          <h2 className="popular-cats-title">Popular Categories</h2>
        </div>
        <Link className="popular-cats-viewall" to="/shop">View All Categories →</Link>
      </div>
      <div className="popular-cats-grid">
        {cats.map(({ label, sub, img, to }) => (
          <Link key={label} className="popular-cat-card" to={to}>
            <div className="popular-cat-img"><img src={img} alt={label} /></div>
            <div className="popular-cat-body">
              <strong>{label}</strong><span>{sub}</span>
              <span className="popular-cat-link">Shop Now →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ImageShowcase() {
  const showcaseItems = [
    { img: unit003Hero, label: "UNIT 003", sublabel: "Next-Gen Humanoid" },
    { img: holoPrism, label: "NEURAL", sublabel: "AI Core Processing" },
    { img: silhouetteFigure, label: "CYBER", sublabel: "Autonomous Systems" },
  ];
  return (
    <motion.section className="image-showcase" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={staggerContainer}>
      {showcaseItems.map((item, i) => (
        <motion.div key={item.label} className="showcase-item holo-shimmer scan-lines corner-brackets" variants={scrollReveal} whileHover={{ scale: 1.02 }} style={{ animationDelay: `${i * 0.4}s` }}>
          <motion.img src={item.img} alt={item.label} initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [.22,1,.36,1] }} />
          <div className="showcase-overlay" />
          <div className="showcase-content">
            <span className="showcase-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="showcase-label">{item.label}</h3>
            <p className="showcase-sublabel">{item.sublabel}</p>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}

function GatewayCards() {
  const cards = [
    ["01", "Shop", "Precision components, modules, sensors, and electronics for serious robotics builds.", "/shop"],
    ["02", "Kits", "Complete matched robotics kits for classrooms, clubs, and competition teams.", "/kits"],
    ["03", "Learn", "Free A5X Academy courses that turn curiosity into practical build skills.", "/learn"]
  ];
  return (
    <motion.section className="gateway-section" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
      {cards.map(([num, title, text, to], i) => (
        <motion.div key={title} variants={scrollReveal} custom={i}>
          <Link className="gateway-card glass-panel holo-shimmer" to={to}>
            <div className="gw-corner" /><div className="gw-shine" />
            <span className="gw-num">{num}</span>
            <h2>{title}</h2><p>{text}</p>
            <span className="gw-link">Explore <span>→</span></span>
          </Link>
        </motion.div>
      ))}
    </motion.section>
  );
}

function WhyRobotics() {
  const cards = [
    [Cpu, "The Future is Autonomous", "By 2030, over 20 million robots will be deployed globally. Robotics is reshaping every industry."],
    [Brain, "AI Is the New Literacy", "Students who learn AI and robotics today will lead tomorrow's world in medicine, engineering, and beyond."],
    [Rocket, "Build. Learn. Innovate.", "Our kits and workshops are designed to turn curiosity into capability through hands-on building."]
  ];
  return (
    <section className="why-robotics">
      <motion.div className="why-content" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <motion.p className="eyebrow" variants={scrollReveal}>WHY ROBOTICS & AI?</motion.p>
        <motion.h2 variants={scrollReveal}>Technology students can <em>touch</em>.</motion.h2>
        <div className="why-cards">
          {cards.map(([Icon, title, text], i) => (
            <motion.article key={title} variants={scrollReveal} whileHover={{ x: 8, transition: { duration: 0.25 } }}>
              <div className="why-icon"><Icon size={22} /></div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </motion.article>
          ))}
        </div>
      </motion.div>
      <motion.div className="why-visual" initial={{ opacity: 0, scale: 0.85, rotate: -3 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [.22,1,.36,1] }}>
        <img src={cyberAndroid} alt="Cyberpunk robot" />
        <div className="why-visual-glow" />
        <span className="why-unit-tag">[ UNIT.NEURAL ]</span>
      </motion.div>
    </section>
  );
}

function HomeAboutA5X() {
  const points = ["4-day intensive hands-on workshops", "Lab setup and curriculum support", "Trusted by schools across Jabalpur", "Components + complete kits available", "Learn online or offline"];
  return (
    <section className="home-about-a5x">
      <motion.div className="about-content" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <motion.p className="eyebrow" variants={scrollReveal}>ABOUT A5X</motion.p>
        <motion.h2 variants={scrollReveal}>Jabalpur's Hub for Robotics & AI Education</motion.h2>
        <motion.p className="about-body" variants={scrollReveal}>A5X Industries conducts hands-on AI and Robotics workshops for school students across Tier 2 India. We offer 4-day programs, lab setup support, and curriculum integration.</motion.p>
        <motion.div className="about-checklist" variants={staggerContainer}>
          {points.map((point) => <motion.p key={point} variants={scrollReveal}><span>▸</span>{point}</motion.p>)}
        </motion.div>
        <motion.div variants={scrollReveal}><ButtonLink to="/contact">Partner With Us →</ButtonLink></motion.div>
      </motion.div>
      <motion.div className="about-image-panel" initial={{ opacity: 0, y: 60, rotate: 2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [.22,1,.36,1] }} whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}>
        <img src={silhouetteFigure} alt="Silhouette figure" />
        <span className="about-unit-label">[ UNIT 001 ]</span>
      </motion.div>
    </section>
  );
}

function HomeStatsBar() {
  const stat1 = useCountUp(20, 2000);
  const stat2 = useCountUp(4, 1500);
  const stat3 = useCountUp(500, 2500);
  const statsData = [
    { ref: stat1.ref, display: `${stat1.count}M+`, label: "ROBOTS PROJECTED BY 2030" },
    { ref: stat2.ref, display: `${stat2.count} Days`, label: "HANDS-ON WORKSHOP FORMAT" },
    { ref: stat3.ref, display: `${stat3.count}+`, label: "COMPONENTS AVAILABLE" },
  ];
  return (
    <motion.section className="home-stats-bar" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut" }}>
      {statsData.map((stat, i) => (
        <React.Fragment key={stat.label}>
          {i > 0 && <div className="stat-divider" />}
          <motion.div className="stat-item" ref={stat.ref} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}>
            <strong>{stat.display}</strong><span>{stat.label}</span>
          </motion.div>
        </React.Fragment>
      ))}
    </motion.section>
  );
}

function Testimonials() {
  const quotes = [
    ["AM", "Anika M.", "Engineering Student", "The kit list finally made sense. I could build the rover without mystery parts."],
    ["RK", "Rohan K.", "Lab Coordinator", "Bulk quotes are clean and the components are documented enough for class use."],
    ["SP", "Sara P.", "Maker", "The L298N and sensor bundles saved me from compatibility guesswork."]
  ];
  return (
    <section className="testimonials" style={{ backgroundImage: `linear-gradient(rgba(5,8,16,.78), rgba(5,8,16,.84)), url(${darkSpheres})` }}>
      <h2>What Makers Say</h2>
      <div>
        {quotes.map(([initials, name, role, quote]) => (
          <article key={name}>
            <b>{initials}</b><h3>{name}</h3><p>{role}</p>
            <span>★★★★★</span><blockquote>{quote}</blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}

function LearnPreview() {
  const courses = useAdminStore((state) => state.courses).filter((course) => course.isPublished).slice(0, 4);
  if (!courses.length) return null;
  return (
    <section className="learn-preview">
      <div className="section-head">
        <div>
          <p className="eyebrow">A5X ACADEMY</p>
          <h2>Learn robotics by building.</h2>
          <p>Free public videos, structured courses, and practical product context.</p>
        </div>
        <ButtonLink to="/learn" ghost>See All Courses</ButtonLink>
      </div>
      <div className="course-row">
        {courses.map((course) => <CourseMiniCard key={course.id} course={course} />)}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    [ShoppingCart, "Browse & Quote", "Add items, set quantities, submit quote"],
    [CheckCircle, "Confirm & Pay", "We verify stock, confirm price, accept payment"],
    [Package, "Build & Ship", "Packed securely, dispatched same/next business day"]
  ];
  return (
    <section className="how">
      <div className="section-head"><div><h2>HOW IT WORKS</h2><p>From component selection to dispatch in three practical steps.</p></div></div>
      <div className="steps">
        {steps.map(([Icon, title, text], index) => (
          <article key={title}><span>{index + 1}</span><Icon /><h3>{title}</h3><p>{text}</p></article>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  const features = ["India-made quality, globally tested", "Sourced directly, no middlemen", "Every component documentation-backed", "Built by makers, for makers"];
  return (
    <section className="about" id="about" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,8,16,.94), rgba(5,8,16,.72)), url(${aboutArc})` }}>
      <img src={robotHands} alt="" />
      <div>
        <p className="eyebrow">WHY A5X?</p>
        <h2>Robotics for Everyone</h2>
        {features.map((feature) => <p className="feature" key={feature}><CircuitBoard size={18} />{feature}</p>)}
        <ButtonLink to="/about" ghost>Our Story</ButtonLink>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="newsletter" style={{ backgroundImage: `linear-gradient(rgba(5,8,16,.88), rgba(5,8,16,.9)), url(${aboutArc})` }}>
      <h2>Join 10,000+ Makers</h2>
      <form><input placeholder="maker@domain.com" /><button>Subscribe</button></form>
      <div><button>GitHub</button><button>Instagram</button><button>YouTube</button><button>Discord</button></div>
    </section>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <PopularCategories />
      <ImageShowcase />
      <GatewayCards />
      <WhyRobotics />
      <HomeAboutA5X />
      <HomeStatsBar />
      <Testimonials />
    </main>
  );
}

export default HomePage;
