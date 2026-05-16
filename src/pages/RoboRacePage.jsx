import { useEffect, useRef } from "react";
import useCartStore from "../stores/useCartStore";
import handsFrame from "../assets/team/hands-frame.png";
import handBase from "../assets/team/hand-base.png";
import roboScooter from "../assets/team/robo-scooter.png";

function RoboRacePage() {
  const sceneRef = useRef(null);
  const carRef = useRef(null);
  const storyOpenRef = useRef(null);
  const storyBuildRef = useRef(null);
  const storyFinalRef = useRef(null);
  const handsFrameRef = useRef(null);
  const handBaseRef = useRef(null);
  const partsRefs = useRef([]);
  const kitPanelRef = useRef(null);
  const scrollCueRef = useRef(null);
  const floatingOrderRef = useRef(null);

  const add = useCartStore((state) => state.add);

  useEffect(() => {
    const scene = sceneRef.current;
    const car = carRef.current;
    const storyOpen = storyOpenRef.current;
    const storyBuild = storyBuildRef.current;
    const storyFinal = storyFinalRef.current;
    const handsFrameEl = handsFrameRef.current;
    const handBase = handBaseRef.current;
    const parts = partsRefs.current.filter(Boolean);
    const kitPanel = kitPanelRef.current;
    const scrollCue = scrollCueRef.current;
    const floatingOrder = floatingOrderRef.current;

    if (!scene || !car) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const mix = (from, to, progress) => from + (to - from) * progress;
    const segment = (progress, start, end) => clamp((progress - start) / (end - start), 0, 1);
    const fadeWindow = (progress, start, peakStart, peakEnd, end) => {
      const fadeIn = segment(progress, start, peakStart);
      const fadeOut = 1 - segment(progress, peakEnd, end);
      return clamp(Math.min(fadeIn, fadeOut), 0, 1);
    };

    const setStory = (el, opacity, y = 0) => {
      if (!el) return;
      el.style.setProperty("--story-opacity", opacity.toFixed(3));
      el.style.setProperty("--story-y", `${y}px`);
    };

    const render = () => {
      const maxScroll = scene.offsetHeight - window.innerHeight;
      const progress = maxScroll > 0 ? clamp(window.scrollY / maxScroll, 0, 1) : 0;
      const mobile = window.innerWidth <= 760;
      
      scene.style.setProperty("--scroll-progress", progress.toFixed(4));
      scene.style.setProperty("--build-glow", segment(progress, 0.08, 0.5).toFixed(3));
      scene.style.setProperty("--wall-opacity", segment(progress, 0.72, 0.86).toFixed(3));
      scene.style.setProperty("--wall-y", `${mix(70, -20, segment(progress, 0.72, 0.96))}px`);
      scene.style.setProperty("--price-opacity", segment(progress, 0.68, 0.82).toFixed(3));
      scene.style.setProperty("--price-y", `${mix(34, 0, segment(progress, 0.68, 0.82))}px`);

      // Floating order button
      if (floatingOrder) {
        floatingOrder.classList.toggle('visible', window.scrollY > 100);
      }

      if (reducedMotion.matches) {
        setStory(storyOpen, 1, 0);
        setStory(storyBuild, 0, 0);
        setStory(storyFinal, 0, 0);
        car.style.setProperty("--car-opacity", "1");
        car.style.setProperty("--car-x", "0px");
        car.style.setProperty("--car-y", mobile ? "110px" : "70px");
        car.style.setProperty("--car-scale", mobile ? "0.78" : "0.9");
        car.style.setProperty("--car-rotate", "0deg");
        ticking = false;
        return;
      }

      setStory(storyOpen, 1 - segment(progress, 0.16, 0.3), mix(0, -44, segment(progress, 0.08, 0.3)));
      setStory(storyBuild, fadeWindow(progress, 0.22, 0.32, 0.48, 0.62), mix(38, -20, segment(progress, 0.22, 0.62)));
      setStory(storyFinal, segment(progress, 0.66, 0.78), mix(44, 0, segment(progress, 0.66, 0.82)));

      const assemble = segment(progress, 0.22, 0.58);
      const reveal = segment(progress, 0.16, 0.3);
      const final = segment(progress, 0.58, 0.86);
      const hands = fadeWindow(progress, 0.08, 0.16, 0.42, 0.58);
      const baseHand = fadeWindow(progress, 0.5, 0.62, 0.82, 0.96);
      
      if (kitPanel) {
        scene.style.setProperty("--kit-fade", segment(progress, 0.18, 0.36).toFixed(3));
      }

      parts.forEach((part, index) => {
        const start = 0.18 + index * 0.045;
        const move = segment(progress, start, start + 0.18);
        const driftX = mix(index % 2 === 0 ? -130 : 130, 0, move);
        const driftY = mix(index % 3 === 0 ? -70 : 70, 0, move);
        part.style.setProperty("--part-opacity", fadeWindow(progress, start, start + 0.06, 0.56, 0.68).toFixed(3));
        part.style.setProperty("--part-x", `${driftX}px`);
        part.style.setProperty("--part-y", `${driftY}px`);
        part.style.setProperty("--part-scale", mix(0.9, 1, move).toFixed(3));
      });

      if (handsFrameEl) {
        handsFrameEl.style.setProperty("--hands-opacity", hands.toFixed(3));
        handsFrameEl.style.setProperty("--hands-y", `${mix(70, -12, segment(progress, 0.08, 0.34))}px`);
        handsFrameEl.style.setProperty("--hands-scale", mix(0.94, 1.02, segment(progress, 0.08, 0.42)).toFixed(3));
      }

      if (handBase) {
        handBase.style.setProperty("--base-hand-opacity", baseHand.toFixed(3));
        handBase.style.setProperty("--base-hand-x", `${mix(110, 0, segment(progress, 0.5, 0.76))}px`);
        handBase.style.setProperty("--base-hand-y", `${mix(80, 0, segment(progress, 0.5, 0.76))}px`);
        handBase.style.setProperty("--base-hand-scale", mix(0.88, 1, segment(progress, 0.5, 0.76)).toFixed(3));
      }

      const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
      const carTravel = easeOutCubic(segment(progress, 0.12, 0.58));
      const finalSettle = segment(progress, 0.58, 0.88);
      const carX = mobile
        ? mix(190, 0, carTravel) + mix(0, -10, finalSettle)
        : mix(420, -24, carTravel) + mix(0, -22, finalSettle);
      const carY = mobile
        ? mix(220, 112, carTravel) + mix(0, -10, finalSettle)
        : mix(210, 70, carTravel) + mix(0, -6, finalSettle);
      const carScale = mobile
        ? mix(0.45, 0.86, Math.max(assemble, final))
        : mix(0.42, 1, Math.max(assemble, final));
      const carRotate = mix(-12, 1.5, carTravel) + Math.sin(progress * Math.PI * 4) * (1 - finalSettle) * 1.2;

      car.style.setProperty("--car-opacity", reveal.toFixed(3));
      car.style.setProperty("--car-x", `${carX}px`);
      car.style.setProperty("--car-y", `${carY}px`);
      car.style.setProperty("--car-scale", carScale.toFixed(3));
      car.style.setProperty("--car-rotate", `${carRotate}deg`);

      ticking = false;
    };

    const requestRender = () => {
      if (!ticking) {
        requestAnimationFrame(render);
        ticking = true;
      }
    };

    const handleScrollCue = () => {
      window.scrollBy({
        top: Math.round(window.innerHeight * 0.78),
        behavior: "smooth",
      });
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    reducedMotion.addEventListener("change", requestRender);
    
    if (scrollCue) {
      scrollCue.addEventListener("click", handleScrollCue);
    }

    requestRender();

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      reducedMotion.removeEventListener("change", requestRender);
      if (scrollCue) {
        scrollCue.removeEventListener("click", handleScrollCue);
      }
    };
  }, []);

  const handleAddToCart = () => {
    add({
      id: 'robo-race-kit',
      name: 'Robo Race Kit',
      price: 3499,
      category: 'Race Kits',
      sku: 'ROBO-RACE-001',
      imageUrl: roboScooter
    });
  };

  return (
    <>
      {/* Header Section */}
      <section className="robo-race-header">
        <div className="robo-race-header-content">
          <h1>Robo Race</h1>
          <p>Build, code, and race your A5X robot</p>
        </div>
      </section>

      {/* Interactive Robo Soccer Section */}
      <main className="robo-soccer-commercial" data-build-scene ref={sceneRef}>
      {/* Floating Order Now pill */}
      <a className="robo-soccer-floating-order" href="#final" ref={floatingOrderRef}>
        Order Now
      </a>

      <div className="robo-soccer-world" aria-hidden="true">
        <span className="robo-soccer-scan robo-soccer-scan-a"></span>
        <span className="robo-soccer-scan robo-soccer-scan-b"></span>
        <span className="robo-soccer-scan robo-soccer-scan-c"></span>
        <span className="robo-soccer-blueprint-ring robo-soccer-ring-a"></span>
        <span className="robo-soccer-blueprint-ring robo-soccer-ring-b"></span>
        <span className="robo-soccer-blueprint-ring robo-soccer-ring-c"></span>
        <span className="robo-soccer-track-line robo-soccer-track-line-a"></span>
        <span className="robo-soccer-track-line robo-soccer-track-line-b"></span>
      </div>

      <button className="robo-soccer-scroll-cue" type="button" aria-label="Scroll down to build the bot" ref={scrollCueRef}>
        <span>Scroll down to build the bot</span>
        <i aria-hidden="true"></i>
      </button>

      <div className="robo-soccer-scroll-meter" aria-hidden="true">
        <span></span>
      </div>

      <aside className="robo-soccer-kit-panel" aria-label="Robo race kit contents" ref={kitPanelRef}>
        <p>What your child learns</p>
        <span>
          <strong>ESP32 control core</strong>
          <small>How code becomes real movement, timing, signals, and wireless control.</small>
        </span>
        <span>
          <strong>L298N motor driver</strong>
          <small>How a tiny command safely controls motors forward, backward, and turning.</small>
        </span>
        <span>
          <strong>Buck power converter</strong>
          <small>Why robots need stable voltage, power planning, and protected electronics.</small>
        </span>
        <span>
          <strong>Race chassis + wheels</strong>
          <small>How grip, balance, friction, and design change speed and performance.</small>
        </span>
      </aside>

      <aside className="robo-soccer-price-card" aria-label="Limited price offer">
        <p>Launch Offer</p>
        <div>
          <del>6000</del>
          <strong>3499</strong>
          <span>only</span>
        </div>
        <small>Complete robo race kit</small>
      </aside>

      <div className="robo-soccer-robo-wall" aria-hidden="true">
        <span>ROBO RACE</span>
        <span>ROBO RACE</span>
        <span>ROBO RACE</span>
        <span>ROBO RACE</span>
        <span>ROBO RACE</span>
        <span>ROBO RACE</span>
      </div>

      <div className="robo-soccer-assembly-ticker" aria-hidden="true">
        <span>Chassis locked</span>
        <span>Motors armed</span>
        <span>ESP32 online</span>
        <span>Driver linked</span>
        <span>Voltage stable</span>
        <span>Race mode ready</span>
      </div>

      <section className="robo-soccer-story robo-soccer-story-open" aria-label="Robo race commercial story" ref={storyOpenRef}>
        <p className="robo-soccer-eyebrow">Curiosity kit / build mode</p>
        <h1>Give Curiosity Wheels.</h1>
        <p className="robo-soccer-lead">Not another toy. A real robo race car your child builds, wires, codes, and watches come alive.</p>
        <div className="robo-soccer-micro-stats" aria-label="Build highlights">
          <span>6 core parts</span>
          <span>1 race-ready bot</span>
          <span>Real robotics learning</span>
        </div>
      </section>

      <section className="robo-soccer-story robo-soccer-story-build" aria-label="Robo race components" ref={storyBuildRef}>
        <p className="robo-soccer-eyebrow">Assembly sequence</p>
        <h2>They Don't Just Play. They Build.</h2>
        <p>Chassis, motor, ESP32, L298N, wheels, and buck converter come together in one smooth build. They learn wiring, coding, motor control, power, debugging, and how real robots turn instructions into motion.</p>
      </section>

      <section className="robo-soccer-story robo-soccer-story-final" id="final" aria-label="Robo race final reveal" ref={storyFinalRef}>
        <p className="robo-soccer-eyebrow">Race mode armed</p>
        <h2>This Is the Bot They'll Brag About.</h2>
        <p>For curious kids who ask "how does it work?" and parents who want the answer to be something they can actually build.</p>
        <div className="robo-soccer-final-offer">
          <del>6000</del>
          <strong>3499</strong>
          <span>only</span>
        </div>
        <button className="robo-soccer-primary" onClick={handleAddToCart}>
          Buy the Robo Race Kit
        </button>
      </section>

      <div className="robo-soccer-component robo-soccer-component-chassis" ref={el => partsRefs.current[0] = el}>
        Chassis
      </div>
      <div className="robo-soccer-component robo-soccer-component-motor" ref={el => partsRefs.current[1] = el}>
        Motors
      </div>
      <div className="robo-soccer-component robo-soccer-component-esp" ref={el => partsRefs.current[2] = el}>
        ESP32
      </div>
      <div className="robo-soccer-component robo-soccer-component-driver" ref={el => partsRefs.current[3] = el}>
        L298N
      </div>
      <div className="robo-soccer-component robo-soccer-component-wheels" ref={el => partsRefs.current[4] = el}>
        Wheels
      </div>
      <div className="robo-soccer-component robo-soccer-component-buck" ref={el => partsRefs.current[5] = el}>
        Buck Converter
      </div>

      <figure className="robo-soccer-hands robo-soccer-hands-frame" aria-hidden="true" ref={handsFrameRef}>
        <img src={handsFrame} alt="" />
      </figure>

      <figure className="robo-soccer-hands robo-soccer-hand-base" aria-hidden="true" ref={handBaseRef}>
        <img src={handBase} alt="" />
      </figure>

      <figure className="robo-soccer-car" aria-label="A5X robo race car" ref={carRef}>
        <img src={roboScooter} alt="A5X Robo Race robotics car kit" />
      </figure>
    </main>
    </>
  );
}

export default RoboRacePage;