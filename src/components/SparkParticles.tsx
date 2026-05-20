import { useEffect, useRef } from "react";

/**
 * Lightweight ember/spark particles for hero accent.
 * Honors prefers-reduced-motion. Caps at 22 particles.
 */
export function SparkParticles() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number };
    const particles: P[] = [];
    const max = 22;

    const spawn = (): P => ({
      x: (Math.random() * 0.6 + 0.2) * (w / devicePixelRatio),
      y: (h / devicePixelRatio) * 0.65 + Math.random() * 20,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.6 + 0.3),
      r: Math.random() * 1.6 + 0.6,
      life: 0,
      max: 90 + Math.random() * 60,
    });

    for (let i = 0; i < max; i++) particles.push(spawn());

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.005;
        p.life += 1;
        const t = 1 - p.life / p.max;
        if (t <= 0) Object.assign(p, spawn());
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grd.addColorStop(0, `rgba(252, 211, 77, ${0.85 * t})`);
        grd.addColorStop(0.4, `rgba(249, 115, 22, ${0.5 * t})`);
        grd.addColorStop(1, "rgba(249, 115, 22, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}