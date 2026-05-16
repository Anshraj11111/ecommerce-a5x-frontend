const scene = document.querySelector("[data-build-scene]");
const car = document.querySelector(".car");
const storyOpen = document.querySelector(".story-open");
const storyBuild = document.querySelector(".story-build");
const storyFinal = document.querySelector(".story-final");
const handsFrame = document.querySelector(".hands-frame");
const handBase = document.querySelector(".hand-base");
const parts = [...document.querySelectorAll(".component")];
const kitPanel = document.querySelector(".kit-panel");
const scrollCue = document.querySelector(".scroll-cue");

if (scene && car) {
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

    if (handsFrame) {
      handsFrame.style.setProperty("--hands-opacity", hands.toFixed(3));
      handsFrame.style.setProperty("--hands-y", `${mix(70, -12, segment(progress, 0.08, 0.34))}px`);
      handsFrame.style.setProperty("--hands-scale", mix(0.94, 1.02, segment(progress, 0.08, 0.42)).toFixed(3));
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

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender);
  reducedMotion.addEventListener("change", requestRender);
  requestRender();
}

if (scrollCue) {
  scrollCue.addEventListener("click", () => {
    window.scrollBy({
      top: Math.round(window.innerHeight * 0.78),
      behavior: "smooth",
    });
  });
}
