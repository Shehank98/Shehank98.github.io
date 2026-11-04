import React from "react";
import {
  aboutSection,
  statsSection,
  educationInfo,
  workExperiences,
  languagesSection
} from "../portfolio";
import {Reveal, SectionHead} from "./Section";
import {useInView, useCountUp} from "./hooks";

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

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHead kicker="01 / ABOUT" title="Who is" accent="Shehan?" />
      {aboutSection.display !== false && (
        <div className="about-grid">
          <Reveal className="about-text">
            {aboutSection.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {languagesSection.display !== false && (
              <div className="chips">
                {languagesSection.languages.map((l, i) => (
                  <span key={i} className="chip" title={l.level}>
                    <i className="fas fa-globe" /> {l.name}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
          <div className="about-cols">
            {statsSection.display !== false && (
              <div className="stats">
                {statsSection.stats.map((s, i) => (
                  <Stat key={i} value={s.value} label={s.label} icon={ICONS[i % 4]} delay={i * 0.08} />
                ))}
              </div>
            )}
          </div>
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
    </section>
  );
}
