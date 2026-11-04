import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {setSound, blip} from "./sfx";

const ITEMS = [
  {id: "home", label: "Home"},
  {id: "about", label: "About"},
  {id: "portfolio", label: "Portfolio"},
  {id: "skills", label: "Skills"},
  {id: "guestbook", label: "Guestbook"},
  {id: "contact", label: "Contact"}
];

/* Floating glass pill. Scroll-spy + RGB-glitch flash when the section changes. */
export default function Nav() {
  const [active, setActive] = useState("home");
  const [glitch, setGlitch] = useState(false);
  const [sound, setSoundState] = useState(false);
  const listRef = useRef(null);
  const [ind, setInd] = useState({x: 0, w: 0, ready: false});

  // glass 'morph' highlight: one blob that slides + resizes to the active item
  useLayoutEffect(() => {
    const place = () => {
      const ul = listRef.current;
      if (!ul) return;
      const a = ul.querySelector('a.active');
      if (a) setInd({x: a.parentElement.offsetLeft, w: a.offsetWidth, ready: true});
    };
    place();
    window.addEventListener('resize', place);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  useEffect(() => {
    const secs = ITEMS.map(i => document.getElementById(i.id)).filter(Boolean);
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      {rootMargin: "-45% 0px -50% 0px"}
    );
    secs.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  const first = React.useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return undefined;
    }
    setGlitch(true);
    blip(480 + ITEMS.findIndex(i => i.id === active) * 60);
    const t = setTimeout(() => setGlitch(false), 520);
    return () => clearTimeout(t);
  }, [active]);

  const go = id => e => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: "smooth", block: "start"});
  };

  return (
    <nav className={`pill-nav ${glitch ? "glitch" : ""}`} aria-label="Sections">
      <ul ref={listRef}>
        <span
          className={`pill-blob ${ind.ready ? 'ready' : ''}`}
          style={{transform: `translateX(${ind.x}px)`, width: ind.w}}
          aria-hidden="true"
        />
        {ITEMS.map(i => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={active === i.id ? "active" : ""}
              data-text={i.label}
              onClick={go(i.id)}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="pill-sound"
        aria-pressed={sound}
        aria-label={sound ? "Mute interface sounds" : "Enable interface sounds"}
        onClick={() => {
          const next = !sound;
          setSound(next);
          setSoundState(next);
          if (next) setTimeout(() => blip(660), 30);
        }}
      >
        <i className={`fas ${sound ? "fa-volume-up" : "fa-volume-mute"}`} />
      </button>
    </nav>
  );
}
