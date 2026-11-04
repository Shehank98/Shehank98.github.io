import React, {useEffect, useRef, useState} from "react";
import {heroSection} from "../portfolio";

/*
 * Loading sequence (~2.8s):
 *  - animated grid + glow fade in; a monogram ring DRAWS itself as loading progresses
 *  - the name sharpens in letter by letter, then a light wave runs through it
 *  - a status line cycles ("Loading assets" -> ... -> "Ready"), counter 000 -> 100
 *  - a glowing progress line fills across the bottom
 *  - at 100% a circular clip-path reveal expands from the centre to uncover the site
 * The loader is removed from the DOM when it finishes (Main unmounts it via onDone).
 */
const LINE_START = 150; // ms
const LINE_DUR = 2000; // 100% reached at ~2.15s
const REVEAL_DUR = 650; // finishes at ~2.8s
const MOUNT_AT = 500; // build the site underneath early so the reveal itself stays smooth
const RING_R = 56;
const RING_C = 2 * Math.PI * RING_R;

const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function initials(name) {
  const w = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!w.length) return "SK";
  return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase();
}

export default function Loader({onMount, onReveal, onDone}) {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // no scrolling behind the loader
    let raf;
    let mounted = false;
    let revealed = false;
    let finished = false;
    const start = performance.now();
    const maxR = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 40;

    const frame = now => {
      const t = now - start;
      const p = Math.min(1, Math.max(0, (t - LINE_START) / LINE_DUR));
      setPct(Math.round(easeInOut(p) * 100));
      if (!mounted && t >= MOUNT_AT) {
        mounted = true;
        onMount(); // heavy work (3D scene etc.) happens while the progress line is filling
      }
      if (t >= LINE_START + LINE_DUR) {
        if (!revealed) {
          revealed = true;
          root.classList.add("revealing");
          onReveal(); // site is already there; start its intro animations as the hole opens
        }
        const r = Math.min(1, (t - (LINE_START + LINE_DUR)) / REVEAL_DUR);
        const radius = easeInOut(r) * maxR;
        // the loader is masked with a growing transparent circle at the centre
        const mask = `radial-gradient(circle at 50% 50%, transparent ${radius}px, #000 ${radius + 2}px)`;
        root.style.webkitMaskImage = mask;
        root.style.maskImage = mask;
        if (contentRef.current) contentRef.current.style.opacity = String(1 - Math.min(1, r * 2.2));
        if (r >= 1 && !finished) {
          finished = true;
          onDone();
          return;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line
  }, []);

  const name = heroSection.loaderName || "HELLO";
  const steps = (heroSection.loaderSteps && heroSection.loaderSteps.length ? heroSection.loaderSteps : ["Loading", "Ready"]);
  // all messages except the last are spread over 0-99%; the last one ("Ready") only at 100%
  const stepText = pct >= 100 || steps.length === 1
    ? steps[steps.length - 1]
    : steps[Math.min(steps.length - 2, Math.floor((pct / 100) * (steps.length - 1)))];
  const dash = RING_C * (1 - pct / 100);

  return (
    <div className="loader" ref={rootRef} role="status" aria-label="Loading">
      {/* backdrop: moving grid + two drifting glows + vignette */}
      <div className="ld-grid" aria-hidden="true" />
      <div className="ld-glow g1" aria-hidden="true" />
      <div className="ld-glow g2" aria-hidden="true" />

      <div className="loader-content" ref={contentRef}>
        {/* corner meta */}
        <div className="ld-corner tl" aria-hidden="true"><i /> PORTFOLIO</div>
        <div className="ld-corner tr" aria-hidden="true">{new Date().getFullYear()}</div>

        <div className="ld-center">
          {/* monogram ring that draws itself with the progress */}
          <div className="ld-ring" aria-hidden="true">
            <svg viewBox="0 0 140 140">
              <defs>
                <linearGradient id="ldg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#818cf8" />
                  <stop offset="0.55" stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <circle className="ld-track" cx="70" cy="70" r={RING_R} />
              <circle
                className="ld-arc"
                cx="70"
                cy="70"
                r={RING_R}
                stroke="url(#ldg)"
                strokeDasharray={RING_C}
                strokeDashoffset={dash}
                transform="rotate(-90 70 70)"
              />
              <circle className="ld-tick" cx="70" cy="70" r={RING_R + 9} />
            </svg>
            <div className="ld-orbit o1"><i /></div>
            <div className="ld-orbit o2"><i /></div>
            <span className="ld-mono">{initials(name)}</span>
          </div>

          {/* name: sharpens in letter by letter, then a light wave runs through it */}
          <h1 className="loader-name" aria-label={name}>
            {name.split("").map((c, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={c === " " ? "gap" : ""}
                style={{"--i": i}}
              >
                {c === " " ? " " : c}
              </span>
            ))}
          </h1>
          <div className="ld-tagline" aria-hidden="true">
            <i />
            <span>{heroSection.loaderTagline || ""}</span>
            <i />
          </div>
        </div>

        {/* bottom: status + counter + glowing progress line */}
        <div className="ld-foot" aria-hidden="true">
          <div className="ld-status">
            <span className="ld-dot" />
            <span key={stepText} className="ld-step">{stepText}</span>
          </div>
          <div className="loader-pct">
            {String(pct).padStart(3, "0")}
            <small>%</small>
          </div>
        </div>
        <div className="loader-line" aria-hidden="true">
          <i style={{transform: `scaleX(${pct / 100})`}} />
          <b style={{left: `${pct}%`}} />
        </div>
      </div>
    </div>
  );
}
