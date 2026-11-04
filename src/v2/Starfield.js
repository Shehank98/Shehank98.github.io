import React, {useEffect, useRef} from "react";

/* Fixed full-page canvas: drifting stars + occasional shooting stars. */
export default function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, raf;
    let stars = [];
    const shooters = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(220, Math.floor((w * h) / 9000));
      stars = Array.from({length: n}, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.2,
        s: Math.random() * 0.15 + 0.02,
        a: Math.random() * Math.PI * 2
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    let mx = 0;
    let my = 0;
    const onMouse = e => {
      mx = (e.clientX / w - 0.5) * 14;
      my = (e.clientY / h - 0.5) * 14;
    };
    window.addEventListener("mousemove", onMouse);

    const draw = t => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y -= s.s;
        if (s.y < -2) {
          s.y = h + 2;
          s.x = Math.random() * w;
        }
        const tw = 0.55 + 0.45 * Math.sin(t / 700 + s.a);
        ctx.globalAlpha = tw;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x + mx * s.r * 0.4, s.y + my * s.r * 0.4, s.r, 0, 6.283);
        ctx.fill();
      }
      if (!reduce && Math.random() < 0.006 && shooters.length < 2) {
        shooters.push({
          x: Math.random() * w * 0.8 + w * 0.2,
          y: Math.random() * h * 0.4,
          life: 0
        });
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.life += 1;
        s.x -= 9;
        s.y += 6;
        const a = Math.max(0, 1 - s.life / 50);
        const g = ctx.createLinearGradient(s.x, s.y, s.x + 130, s.y - 86);
        g.addColorStop(0, `rgba(180,170,255,${a})`);
        g.addColorStop(1, "rgba(180,170,255,0)");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + 130, s.y - 86);
        ctx.stroke();
        if (s.life > 50) shooters.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);
  return <canvas className="starfield" ref={ref} aria-hidden="true" />;
}
