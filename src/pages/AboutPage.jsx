import React from "react";
import { Link } from "react-router-dom";
import { Brain, CircuitBoard, Rocket, Shield, Star, Zap } from "lucide-react";
import aboutArc from "../assets/about-arc.jpg";
import robotHands from "../assets/robot-hands.jpg";
import teamAnsh from "../assets/team/Ansh.png";
import teamAnupam from "../assets/team/Anupam.png";
import teamChris from "../assets/team/Chris.JPG";
import teamAmit from "../assets/team/Amit.jpg";
import teamAditya from "../assets/team/Aditya.jpg";

function AboutPage() {
  const stats = [
    { num: "500+", label: "Happy Makers" },
    { num: "50+", label: "Products" },
    { num: "10+", label: "Courses" },
    { num: "24hr", label: "Dispatch" },
  ];

  const values = [
    { icon: CircuitBoard, title: "India-Made Quality", desc: "Every component is sourced directly and tested to meet global standards before reaching your hands." },
    { icon: Zap, title: "No Middlemen", desc: "We work directly with manufacturers to give you the best prices without compromising on quality." },
    { icon: Shield, title: "Documentation Backed", desc: "Every product comes with full documentation, datasheets, and code examples to get you started fast." },
    { icon: Brain, title: "Built by Makers", desc: "Our team consists of engineers and robotics enthusiasts who understand exactly what builders need." },
    { icon: Rocket, title: "Fast Dispatch", desc: "Orders are packed and dispatched within 24 hours so your projects never have to wait." },
    { icon: Star, title: "Community First", desc: "We support schools, colleges, and maker communities with special pricing and workshop support." },
  ];

  const team = [
    { name: "Ansh Raj Baghel", role: "Co-Founder & Full-Stack Lead", desc: "💻 Turns caffeine into clean code. The backbone of every digital magic we create. ✨", photo: teamAnsh, initial: "A" },
    { name: "Anupam Mishra", role: "Co-Founder & AI/ML Software Lead", desc: "Predicts the future before algorithms even learn it. Brains + Machine = Innovation. 🤖 ✨", photo: teamAnupam, initial: "A" },
    { name: "Chris Alex Francis", role: "Co-Founder & IoT + Robotics Lead", desc: "Makes ideas move, blink & fly. If it's hardware, Chris already cracked it. ⚡ 🤖", photo: teamChris, initial: "C" },
    { name: "Amit Payasi", role: "Co-Founder & Hardware Lead", desc: "🔧 Soldering, circuits, sensors — if it's noisy & technical, Amit loves it. 🔥 💡", photo: teamAmit, initial: "A" },
    { name: "Aditya Mishra", role: "Co-Founder & Software Dev", desc: "🧠 Writes code so smooth, even bugs give up. UI? Logic? Speed? He owns it. ⚡ 💻", photo: teamAditya, initial: "A" },
  ];

  const timeline = [
    { year: "2024", title: "Founded", desc: "A5X Industries started with a vision to democratize robotics education in India." },
    { year: "2024", title: "First Products", desc: "Launched our first range of robotics components, reaching makers and students across India." },
    { year: "2025", title: "Academy Launch", desc: "Launched A5X Academy with free video courses for students and hobbyists." },
    { year: "2026", title: "Scaling Up", desc: "Expanding product range, adding premium kits, and building India's largest robotics community." },
  ];

  return (
    <main className="about-page-new">
      <div className="about-hero">
        <div className="about-hero-bg">
          <div className="about-hero-orb about-orb-1" />
          <div className="about-hero-orb about-orb-2" />
          <div className="about-hero-grid" />
        </div>
        <div className="about-hero-content">
          <p className="about-eyebrow">ABOUT A5X INDUSTRIES</p>
          <h1 className="about-hero-title">
            <span className="about-title-line1">BUILDING</span>
            <span className="about-title-line2">THE FUTURE</span>
          </h1>
          <p className="about-hero-desc">
            A5X Industries is India's premier destination for robotics components, kits, and education.
            We believe every student deserves access to quality robotics tools and knowledge.
          </p>
          <div className="about-hero-stats">
            {stats.map(({ num, label }) => (
              <div key={label} className="about-stat">
                <span className="about-stat-num">{num}</span>
                <span className="about-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-hero-img">
          <img src={aboutArc} alt="A5X Robotics" />
          <div className="about-hero-img-glow" />
        </div>
      </div>

      <div className="about-mission">
        <div className="about-mission-inner">
          <div className="about-mission-text">
            <p className="about-eyebrow">OUR MISSION</p>
            <h2>Robotics for <em>Everyone</em></h2>
            <p>We started A5X Industries because we saw a gap — students and makers in India had brilliant ideas but couldn't find quality components at fair prices. We're here to change that.</p>
            <p>From a single Arduino to a complete robotics lab setup, we provide everything you need to bring your ideas to life. Our team of engineers personally tests every product we sell.</p>
            <Link to="/shop" className="btn" style={{ marginTop: '24px', display: 'inline-flex' }}>Explore Products</Link>
          </div>
          <div className="about-mission-img">
            <img src={robotHands} alt="Robot hands" />
            <div className="about-mission-badge">
              <Rocket size={20} />
              <span>Made for Makers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="about-values">
        <div className="about-section-header">
          <p className="about-eyebrow">WHY CHOOSE US</p>
          <h2>Our Core Values</h2>
          <p>What makes A5X different from every other electronics store</p>
        </div>
        <div className="about-values-grid">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="about-value-card">
              <div className="about-value-icon"><Icon size={24} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-timeline-section">
        <div className="about-section-header">
          <p className="about-eyebrow">OUR JOURNEY</p>
          <h2>How We Got Here</h2>
        </div>
        <div className="about-timeline">
          {timeline.map(({ year, title, desc }, i) => (
            <div key={year} className={`about-timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="about-timeline-content">
                <span className="about-timeline-year">{year}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <div className="about-timeline-dot" />
            </div>
          ))}
          <div className="about-timeline-line" />
        </div>
      </div>

      <div className="about-team">
        <div className="about-section-header">
          <p className="about-eyebrow">THE TEAM</p>
          <h2>People Behind A5X</h2>
          <p>The co-founders building India's robotics future</p>
        </div>
        <div className="about-team-row-3">
          {team.slice(0, 3).map(({ name, role, desc, photo, initial }) => (
            <div key={name} className="about-team-card">
              <div className="about-team-photo-wrap">
                <img src={photo} alt={name} className="about-team-photo" style={{ position: 'relative', zIndex: 2 }} />
                <div className="about-team-avatar-fallback" style={{ zIndex: 1 }}>{initial}</div>
              </div>
              <div className="about-team-card-body">
                <h3>{name}</h3>
                <span className="about-team-role">{role}</span>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="about-team-row-2">
          {team.slice(3, 5).map(({ name, role, desc, photo, initial }) => (
            <div key={name} className="about-team-card">
              <div className="about-team-photo-wrap">
                <img src={photo} alt={name} className="about-team-photo" style={{ position: 'relative', zIndex: 2 }} />
                <div className="about-team-avatar-fallback" style={{ zIndex: 1 }}>{initial}</div>
              </div>
              <div className="about-team-card-body">
                <h3>{name}</h3>
                <span className="about-team-role">{role}</span>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-cta">
        <div className="about-cta-inner">
          <h2>Ready to Build Something Amazing?</h2>
          <p>Join 500+ makers, students, and engineers who trust A5X for their robotics projects.</p>
          <div className="about-cta-btns">
            <Link to="/shop" className="btn">Shop Components</Link>
            <Link to="/learn" className="btn ghost">Free Courses</Link>
            <Link to="/contact" className="btn ghost">Contact Us</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;
