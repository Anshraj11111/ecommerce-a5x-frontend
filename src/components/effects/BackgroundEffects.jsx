import React from "react";

// Aurora Background Component
export function AuroraBackground() {
  return (
    <div className="aurora-background">
      <div className="aurora-layer aurora-layer-1"></div>
      <div className="aurora-layer aurora-layer-2"></div>
      <div className="aurora-layer aurora-layer-3"></div>
    </div>
  );
}

// Twinkle Field Component
export function TwinkleField() {
  return (
    <div className="twinkle-field">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="twinkle-star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
}

// Floating Orbs Component
export function FloatingOrbs() {
  return (
    <div className="floating-orbs">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="floating-orb"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
}

// Custom Cursor Component
export function CustomCursor() {
  return (
    <div className="custom-cursor">
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
    </div>
  );
}