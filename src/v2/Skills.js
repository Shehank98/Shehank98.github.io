import React, {useEffect, useRef, useState} from "react";
import {skillsSection, techStack, linkedinRecommendations} from "../portfolio";
import {Reveal, SectionHead} from "./Section";
import {useInView} from "./hooks";

// One recommendation: full text (every paragraph), collapsed to a preview with a "Read more" toggle
function Rec({r, delay}) {
  const [open, setOpen] = useState(false);
  const [long, setLong] = useState(false);
  const box = useRef(null);
  const paras = String(r.recommendation || "").split(/\n\s*\n/).filter(Boolean);
  useEffect(() => {
    const check = () => box.current && setLong(box.current.scrollHeight > 190);
    check();
    window.addEventListener("resize", check);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(check);
    return () => window.removeEventListener("resize", check);
  }, [r.recommendation]);
  return (
    <Reveal className="rec" delay={delay}>
      <div ref={box} className={`rec-text ${open ? "open" : ""} ${long && !open ? "fade" : ""}`}>
        {paras.map((t, i) => (
          <p key={i}>{i === 0 ? "\u201C" : ""}{t}{i === paras.length - 1 ? "\u201D" : ""}</p>
        ))}
      </div>
      {long && (
        <button type="button" className="rec-more" aria-expanded={open} onClick={() => setOpen(o => !o)}>
          {open ? "Show less" : "Read more"} <i className={`fas fa-chevron-${open ? "up" : "down"}`} />
        </button>
      )}
      <div className="rec-by">
        {r.image && <img src={r.image} alt="" />}
        <div>
          <strong>{r.recommenderName}</strong>
          <span>
            {r.title}, {r.company}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

function Ring({label, pct, delay}) {
  const [ref, seen] = useInView();
  const v = parseInt(pct, 10) || 0;
  const R = 44;
  const C = 2 * Math.PI * R;
  return (
    <div ref={ref} className={`ring reveal ${seen ? "in" : ""}`} style={{"--d": `${delay}s`}}>
      <svg viewBox="0 0 100 100" width="104" height="104">
        <circle cx="50" cy="50" r={R} className="ring-bg" />
        <circle
          cx="50"
          cy="50"
          r={R}
          className="ring-fg"
          strokeDasharray={C}
          strokeDashoffset={seen ? C * (1 - v / 100) : C}
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="56" textAnchor="middle" className="ring-txt">
          {v}%
        </text>
      </svg>
      <span>{label}</span>
    </div>
  );
}

export default function Skills() {
  const sw = skillsSection.softwareSkills || [];
  const doubled = [...sw, ...sw];
  const recs = linkedinRecommendations.recommendations || [];
  return (
    <>
      <section id="skills" className="section">
        <SectionHead title={skillsSection.title} accent="" sub={skillsSection.subTitle} />
        <div className="marquee" aria-label="Tools and technologies">
          <div className="marquee-track">
            {doubled.map((s, i) => (
              <span className="skill-chip" key={i}>
                <i className={s.fontAwesomeClassname} /> {s.skillName}
              </span>
            ))}
          </div>
        </div>
        <div className="skills-grid">
          <Reveal className="skill-list">
            {skillsSection.skills.map((s, i) => (
              <p key={i}>
                <i className="fas fa-chevron-right" /> {s}
              </p>
            ))}
          </Reveal>
          {techStack.viewSkillBars && (
            <div className="rings">
              {techStack.experience.map((e, i) => (
                <Ring key={i} label={e.Stack} pct={e.progressPercentage} delay={i * 0.1} />
              ))}
            </div>
          )}
        </div>

        {linkedinRecommendations.display !== false && recs.length > 0 && (
          <>
            <SectionHead title="What people" accent="say" />
            <div className="recs">
              {recs.map((r, i) => (
                <Rec key={i} r={r} delay={i * 0.1} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
