import React, {useEffect, useState} from "react";
import {heroSection, badge} from "../portfolio";

/* Full-screen loader: 0 -> 100% counter with a mini ID card that "prints",
 * then a curtain split reveals the site. */
export default function Loader({onDone, onReveal}) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const total = 2600;
    const step = now => {
      const t = Math.min(1, (now - start) / total);
      // ease so it feels like real loading: quick, slow middle, quick end
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(step);
      else {
        setTimeout(() => setLeaving(true), 250);
        setTimeout(onReveal, 650);
        setTimeout(onDone, 1500);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, []);

  const chars = (heroSection.loaderName || "HELLO").split("");

  return (
    <div className={`loader ${leaving ? "leaving" : ""}`} role="status" aria-label="Loading">
      <div className="loader-curtain left" />
      <div className="loader-curtain right" />
      <div className="loader-center">
        <div className="loader-card" style={{"--p": pct / 100}}>
          <div className="lc-slot" />
          <div className="lc-photo">
            <i className="fas fa-user" />
          </div>
          <div className="lc-line w70" />
          <div className="lc-line w45" />
          <div className="lc-bars" />
          <div className="lc-scan" />
        </div>
        <div className="loader-name" aria-hidden="true">
          {chars.map((c, i) => (
            <span key={i} style={{animationDelay: `${i * 0.09}s`}}>
              {c}
            </span>
          ))}
        </div>
        <div className="loader-meta">
          <span>{badge.tagline}</span>
          <span className="loader-pct">{String(pct).padStart(3, "0")}%</span>
        </div>
        <div className="loader-bar">
          <i style={{transform: `scaleX(${pct / 100})`}} />
        </div>
      </div>
    </div>
  );
}
