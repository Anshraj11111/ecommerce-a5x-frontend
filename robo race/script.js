const scene = document.querySelector("[data-parallax-scene]");

if (scene) {
  const layers = {
    modelX: 0,
    modelY: 0,
    textX: 0,
    textY: 0,
    bgX: 50,
    bgY: 50,
  };

  let target = { ...layers };
  let rafId = 0;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const render = () => {
    layers.modelX += (target.modelX - layers.modelX) * 0.08;
    layers.modelY += (target.modelY - layers.modelY) * 0.08;
    layers.textX += (target.textX - layers.textX) * 0.07;
    layers.textY += (target.textY - layers.textY) * 0.07;
    layers.bgX += (target.bgX - layers.bgX) * 0.05;
    layers.bgY += (target.bgY - layers.bgY) * 0.05;

    scene.style.setProperty("--model-x", `${layers.modelX}px`);
    scene.style.setProperty("--model-y", `${layers.modelY}px`);
    scene.style.setProperty("--text-x", `${layers.textX}px`);
    scene.style.setProperty("--text-y", `${layers.textY}px`);
    scene.style.setProperty("--bg-x", `${layers.bgX}%`);
    scene.style.setProperty("--bg-y", `${layers.bgY}%`);

    rafId = requestAnimationFrame(render);
  };

  const updateParallax = (event) => {
    if (prefersReducedMotion.matches || window.innerWidth < 760) return;

    const rect = scene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    target = {
      modelX: x * 22,
      modelY: y * 16,
      textX: x * -18,
      textY: y * -10,
      bgX: 50 + x * 2.2,
      bgY: 50 + y * 1.8,
    };
  };

  const resetParallax = () => {
    target = {
      modelX: 0,
      modelY: 0,
      textX: 0,
      textY: 0,
      bgX: 50,
      bgY: 50,
    };
  };

  scene.addEventListener("pointermove", updateParallax);
  scene.addEventListener("pointerleave", resetParallax);

  if (!prefersReducedMotion.matches) {
    rafId = requestAnimationFrame(render);
  }

  prefersReducedMotion.addEventListener("change", () => {
    cancelAnimationFrame(rafId);
    resetParallax();
    if (!prefersReducedMotion.matches) {
      rafId = requestAnimationFrame(render);
    }
  });
}
