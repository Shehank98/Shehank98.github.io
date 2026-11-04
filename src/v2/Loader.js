import React, {useEffect, useRef, useState} from "react";
import {heroSection} from "../portfolio";

/*
 * Loading sequence (~2.5s total):
 *  a. dark screen, name appears letter by letter (staggered fade + slight rise)
 *  b. thin progress line fills across the bottom, counter 0 -> 100
 *  c. at 100% a circular clip reveal expands from the centre to uncover the site
 * The loader is removed from the DOM when it finishes (Main unmounts it via onDone).
 */
const LINE_START = 150; // ms
const LINE_DUR = 1750; // 100% reached at 1.9s
const REVEAL_DUR = 600; // finishes at 2.5s
const MOUNT_AT = 500; // build the site underneath early so the reveal itself stays smooth

const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

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
  const chars = name.split("");

  return (
    <div className="loader" ref={rootRef} role="status" aria-label="Loading">
      <div className="loader-content" ref={contentRef}>
        <h1 className="loader-name" aria-label={name}>
          {chars.map((c, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={c === " " ? "gap" : ""}
              style={{animationDelay: `${0.12 + i * 0.07}s`}}
            >
              {c === " " ? " " : c}
            </span>
          ))}
        </h1>
        <div className="loader-pct" aria-hidden="true">
          {String(pct).padStart(3, "0")}%
        </div>
        <div className="loader-line" aria-hidden="true">
          <i style={{transform: `scaleX(${pct / 100})`}} />
        </div>
      </div>
    </div>
  );
}
