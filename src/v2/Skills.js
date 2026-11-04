import React from "react";
import {skillsSection, techStack, achievementSection, honorsSection, linkedinRecommendations} from "../portfolio";
import {Reveal, SectionHead} from "./Section";
import {useInView} from "./hooks";

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
  const certs = achievementSection.achievementsCards || [];
  const awards = honorsSection.awards || [];
  const recs = (linkedinRecommendations.recommendations || []).slice(0, 2);
  return (
    <>
      <section id="skills" className="section">
        <SectionHead kicker="03 / SKILLS" title={skillsSection.title} accent="" sub={skillsSection.subTitle} />
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

        <SectionHead kicker="04 / CREDENTIALS" title="Certificates &" accent="Awards" />
        <div className="cred-grid">
          {certs.map((c, i) => (
            <Reveal key={i} className="cred" delay={(i % 3) * 0.07}>
              {c.image && <img src={c.image} alt="" />}
              <div>
                <h4>{c.title}</h4>
                <p>{c.subtitle}</p>
                {c.footerLink && c.footerLink[0] && (
                  <a href={c.footerLink[0].url} target="_blank" rel="noopener noreferrer">
                    {c.footerLink[0].name} <i className="fas fa-external-link-alt" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
          {awards.map((a, i) => (
            <Reveal key={"a" + i} className="cred award" delay={(i % 3) * 0.07}>
              <i className="fas fa-trophy" />
              <div>
                <h4>{a.title}</h4>
                <p>
                  {a.date} — {a.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {linkedinRecommendations.display !== false && recs.length > 0 && (
          <>
            <SectionHead kicker="05 / KIND WORDS" title="What people" accent="say" />
            <div className="recs">
              {recs.map((r, i) => (
                <Reveal key={i} className="rec" delay={i * 0.1}>
                  <p>“{r.recommendation.split("\n\n")[0]}”</p>
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
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
