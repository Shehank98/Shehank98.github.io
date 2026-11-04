import React from "react";
import {
  aboutSection,
  statsSection,
  educationInfo,
  workExperiences,
  badge,
  bigProjects,
  achievementSection,
  honorsSection
} from "../portfolio";
import {Reveal} from "./Section";
import {useInView, useCountUp} from "./hooks";

function CountCard({value, label, sub, icon, delay}) {
  const [ref, seen] = useInView();
  const out = useCountUp(String(value), seen, 1200);
  return (
    <div ref={ref} className={`count-card reveal ${seen ? "in" : ""}`} style={{"--d": `${delay}s`}}>
      <div className="cc-top">
        <span className="cc-ico"><i className={icon} /></span>
        <span className="cc-num">{out}</span>
      </div>
      <div className="cc-label">{label}</div>
      <div className="cc-sub">{sub}</div>
    </div>
  );
}

function Stat({value, label, icon, delay}) {
  const [ref, seen] = useInView();
  const out = useCountUp(value, seen);
  return (
    <div ref={ref} className={`stat reveal ${seen ? "in" : ""}`} style={{"--d": `${delay}s`}}>
      <div className="stat-glow" />
      <i className={`stat-ico ${icon}`} />
      <div className="stat-num">{out}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

const ICONS = ["fas fa-tv", "fas fa-brain", "fas fa-bolt", "fas fa-trophy"];

// bold the key phrases (aboutSection.highlights) inside a paragraph
function withHighlights(text, highlights) {
  const list = (highlights || []).filter(h => h && text.includes(h));
  if (!list.length) return text;
  const esc = list.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp("(" + esc.join("|") + ")", "g"));
  return parts.map((part, i) => (list.includes(part) ? <strong key={i}>{part}</strong> : part));
}

export default function About() {
  const paras = aboutSection.paragraphs || [];
  const nameParts = (aboutSection.displayName || "").split(" ");
  const first = nameParts.shift() || "";
  const rest = nameParts.join(" ");
  const photo = aboutSection.photo || badge.photo;
  const cutout = aboutSection.photoCutout || "";
  const style = ["floating", "halo", "poster"].includes(aboutSection.photoStyle) ? aboutSection.photoStyle : "floating";
  return (
    <section id="about" className="section about-sec">
      <Reveal as="h2" className="about-title">{aboutSection.title}</Reveal>
      {aboutSection.display !== false && (
        <div className="about-hero">
          {/* LEFT: big stacked name, language switcher, Contact Me */}
          <Reveal className="about-name">
            <span className="about-hi">{aboutSection.greetingLine}</span>
            <span className="about-first">{first}</span>
            {rest && <span className="about-last">{rest}</span>}
          </Reveal>

          {/* CENTRE: photo */}
          {cutout ? (
            <Reveal className={`about-photo cut cut-${style}`} delay={0.1}>
              {style === "poster" && <span className="cut-word" aria-hidden="true">{first.toUpperCase()}</span>}
              {style === "halo" && <span className="cut-disc" aria-hidden="true" />}
              {style === "floating" && <span className="cut-glow" aria-hidden="true" />}
              <img src={cutout} alt={aboutSection.displayName} />
            </Reveal>
          ) : (
            <Reveal className="about-photo" delay={0.1}>
              <div className="ring r1" />
              <div className="ring r2" />
              <i className="orbit-dot" />
              {photo ? (
                <img src={photo} alt={aboutSection.displayName} />
              ) : (
                <div className="about-ph"><i className="fas fa-user" /></div>
              )}
            </Reveal>
          )}

          {/* RIGHT: the three paragraphs + View Projects */}
          <Reveal className="about-copy" delay={0.2}>
            <div className="about-copy-text">
              {paras.map((p, i) => (
                <p key={i}>{withHighlights(p, aboutSection.highlights)}</p>
              ))}
            </div>
          </Reveal>
        </div>
      )}

      {statsSection.display !== false && (
        <div className="stats stats-row">
          {statsSection.stats.map((s, i) => (
            <Stat key={i} value={s.value} label={s.label} icon={ICONS[i % 4]} delay={i * 0.08} />
          ))}
        </div>
      )}

      <div className="two-col">
        <div>
          <Reveal as="h3" className="col-title">Experience</Reveal>
          <div className="timeline">
            {workExperiences.experience.map((x, i) => (
              <Reveal key={i} className="tl-card" delay={i * 0.06}>
                <span className="tl-dot" />
                {x.companylogo && <img src={x.companylogo} alt="" />}
                <div>
                  <h4>{x.role}</h4>
                  <p className="tl-sub">
                    {x.company} · {x.date}
                  </p>
                  {x.desc && <p className="tl-desc">{x.desc}</p>}
                  {x.descBullets && (
                    <ul>
                      {x.descBullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <Reveal as="h3" className="col-title">Education</Reveal>
          <div className="timeline">
            {educationInfo.schools.map((x, i) => (
              <Reveal key={i} className="tl-card" delay={i * 0.06}>
                <span className="tl-dot" />
                {x.logo && <img src={x.logo} alt="" />}
                <div>
                  <h4>{x.schoolName}</h4>
                  <p className="tl-sub">{x.subHeader}</p>
                  <p className="tl-date">{x.duration}</p>
                  {x.desc && <p className="tl-desc">{x.desc}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="count-grid">
        <CountCard
          value={(bigProjects.projects || []).length}
          label="PROJECTS"
          sub="Systems & research built"
          icon="fas fa-code"
          delay={0}
        />
        <CountCard
          value={(achievementSection.achievementsCards || []).length}
          label="CERTIFICATES"
          sub="Skills validated"
          icon="fas fa-award"
          delay={0.08}
        />
        <CountCard
          value={(honorsSection.awards || []).length}
          label="AWARDS"
          sub="Recognition earned"
          icon="fas fa-trophy"
          delay={0.16}
        />
      </div>
    </section>
  );
}
