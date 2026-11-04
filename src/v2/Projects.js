import React, {useCallback, useEffect, useRef, useState} from "react";
import {bigProjects} from "../portfolio";
import {SectionHead} from "./Section";
import {blip} from "./sfx";

function TiltCard({project, index, onOpen}) {
  const ref = useRef(null);
  const move = e => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const leave = () => {
    ref.current.style.transform = "";
  };
  return (
    <article
      ref={ref}
      className="proj-card"
      onMouseMove={move}
      onMouseLeave={leave}
      onClick={() => onOpen(index)}
      tabIndex={0}
      onKeyDown={e => (e.key === "Enter" ? onOpen(index) : null)}
    >
      <div className="proj-shine" />
      <span className="proj-num">{String(index + 1).padStart(2, "0")}</span>
      <div className="proj-img">
        {project.image ? <img src={project.image} alt={project.projectName} draggable="false" /> : <i className="fas fa-cube" />}
      </div>
      <h3>{project.projectName}</h3>
      <p>{project.projectDesc}</p>
      <span className="proj-more">
        View project <i className="fas fa-arrow-right" />
      </span>
    </article>
  );
}

export default function Projects() {
  const projects = bigProjects.projects || [];
  const trackRef = useRef(null);
  const [open, setOpen] = useState(null);

  // drag-to-scroll with mouse
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    let down = false;
    let sx = 0;
    let sl = 0;
    let moved = 0;
    const md = e => {
      down = true;
      moved = 0;
      sx = e.pageX;
      sl = el.scrollLeft;
    };
    const mm = e => {
      if (!down) return;
      const dx = e.pageX - sx;
      moved = Math.max(moved, Math.abs(dx));
      el.scrollLeft = sl - dx;
    };
    const mu = () => {
      down = false;
    };
    const click = e => {
      if (moved > 6) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    el.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    el.addEventListener("click", click, true);
    return () => {
      el.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
      el.removeEventListener("click", click, true);
    };
  }, []);

  const scrollBy = dir => {
    const el = trackRef.current;
    el.scrollBy({left: dir * (el.clientWidth * 0.7), behavior: "smooth"});
  };

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    d => setOpen(o => (o === null ? o : (o + d + projects.length) % projects.length)),
    [projects.length]
  );

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = e => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    blip(700);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  if (bigProjects.display === false) return null;
  const p = open !== null ? projects[open] : null;

  return (
    <section id="portfolio" className="section">
      <SectionHead
        kicker="02 / PORTFOLIO"
        title="Featured"
        accent="Projects"
        sub={bigProjects.subtitle}
      />
      <div className="proj-wrap">
        <button className="proj-arrow left" onClick={() => scrollBy(-1)} aria-label="Previous projects">
          <i className="fas fa-chevron-left" />
        </button>
        <div className="proj-track" ref={trackRef}>
          {projects.map((pr, i) => (
            <TiltCard key={i} project={pr} index={i} onOpen={setOpen} />
          ))}
        </div>
        <button className="proj-arrow right" onClick={() => scrollBy(1)} aria-label="Next projects">
          <i className="fas fa-chevron-right" />
        </button>
      </div>
      <p className="proj-hint">Drag or use the arrows · click a project to open it</p>

      {p && (
        <div className="proj-modal" role="dialog" aria-modal="true" aria-label={p.projectName}>
          <div className="pm-bg" onClick={close} />
          <div className="pm-panel" key={open}>
            <button className="pm-close" onClick={close} aria-label="Close">
              <i className="fas fa-times" />
            </button>
            <div className="pm-media">
              {p.image ? <img src={p.image} alt={p.projectName} /> : <i className="fas fa-cube" />}
            </div>
            <div className="pm-body">
              <span className="kicker">
                PROJECT {String(open + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              <h3>{p.projectName}</h3>
              <p>{p.projectDesc}</p>
              <div className="pm-links">
                {(p.footerLink || []).map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {l.name} <i className="fas fa-external-link-alt" />
                  </a>
                ))}
              </div>
              <div className="pm-nav">
                <button onClick={() => step(-1)} className="btn-ghost">
                  <i className="fas fa-arrow-left" /> Prev
                </button>
                <button onClick={() => step(1)} className="btn-ghost">
                  Next <i className="fas fa-arrow-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
