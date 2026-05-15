import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";

export function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; ctx.scale(2, 2); };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, ${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 200, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="hero-particles" />;
}

export function TypewriterText({ texts, speed = 80, pause = 2000 }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[textIndex];
    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex(charIndex + 1), speed);
      return () => clearTimeout(t);
    } else if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    } else if (deleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex(charIndex - 1), speed / 2);
      return () => clearTimeout(t);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }
  }, [charIndex, deleting, textIndex, texts, speed, pause]);
  return <span>{texts[textIndex].slice(0, charIndex)}<span className="blink-cursor">|</span></span>;
}

export function AuroraBackground() {
  return <div className="aurora-bg" />;
}

export function TwinkleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const resize = () => { canvas.width = window.innerWidth * 2; canvas.height = window.innerHeight * 2; ctx.scale(2, 2); };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
      });
    }
    const draw = (time) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        const alpha = p.baseAlpha * (0.5 + 0.5 * Math.sin(time * p.speed + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="twinkle-field" />;
}

export function FloatingOrbs() {
  const orbs = [
    { size: 300, color: "rgba(0,245,255,.08)", top: "10%", left: "5%", dur: 8 },
    { size: 250, color: "rgba(124,58,237,.07)", top: "60%", left: "80%", dur: 10 },
    { size: 200, color: "rgba(240,4,127,.05)", top: "30%", left: "50%", dur: 12 },
    { size: 180, color: "rgba(0,245,255,.06)", top: "80%", left: "20%", dur: 9 },
    { size: 220, color: "rgba(124,58,237,.05)", top: "15%", left: "70%", dur: 11 },
    { size: 160, color: "rgba(0,245,255,.04)", top: "50%", left: "35%", dur: 14 },
  ];
  return orbs.map((orb, i) => (
    <div key={i} className="floating-orb" style={{
      width: orb.size, height: orb.size, top: orb.top, left: orb.left,
      background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
      animation: `orb-drift-${(i % 3) + 1} ${orb.dur}s ease-in-out infinite`,
    }} />
  ));
}

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const lerp = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (dotRef.current) { dotRef.current.style.left = mouseX + "px"; dotRef.current.style.top = mouseY + "px"; }
      if (ringRef.current) { ringRef.current.style.left = ringX + "px"; ringRef.current.style.top = ringY + "px"; }
      requestAnimationFrame(lerp);
    };
    window.addEventListener("mousemove", onMove);
    requestAnimationFrame(lerp);
    const onOver = (e) => { if (e.target.closest("a, button, .interactive")) document.body.classList.add("cursor-hover"); };
    const onOut = (e) => { if (e.target.closest("a, button, .interactive")) document.body.classList.remove("cursor-hover"); };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);
  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}

export function MagneticButton({ children, to, onClick }) {
  const btnRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
  };
  const handleMouseLeave = () => { if (btnRef.current) btnRef.current.style.transform = ""; };
  const handleClick = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    onClick?.(e);
  };
  const inner = (
    <button ref={btnRef} className="magnetic-btn interactive" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      {children}
      {ripples.map((r) => <span key={r.id} className="ripple" style={{ left: r.x, top: r.y, width: 60, height: 60, marginLeft: -30, marginTop: -30 }} />)}
    </button>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}

export function StaggerReveal({ children, className = "", delay = 0 }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`scroll-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function LetterReveal({ text, className = "" }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span key={i} initial={{ opacity: 0, y: 30, rotateX: -90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroTilt({ children }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0)"; };
  return <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ transition: "transform .2s ease-out" }}>{children}</div>;
}
