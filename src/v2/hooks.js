import {useEffect, useRef, useState} from "react";

/* true once the element has scrolled into view (stays true) */
export function useInView(options) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      {threshold: 0.15, ...options}
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return [ref, seen];
}

/* counts "98.2%" / "7+" / "40+" up from 0 once visible; non-numeric values pass through */
export function useCountUp(value, active, duration = 1400) {
  const m = String(value).match(/^([\d.]+)(.*)$/);
  const [out, setOut] = useState(m ? "0" + m[2] : String(value));
  useEffect(() => {
    if (!m || !active) return undefined;
    const target = parseFloat(m[1]);
    const decimals = (m[1].split(".")[1] || "").length;
    let raf;
    const start = performance.now();
    const step = now => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      setOut((target * e).toFixed(decimals) + m[2]);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [active, value]);
  return out;
}
