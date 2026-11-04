import React, {useState} from "react";
import {
  aboutSection,
  statsSection,
  educationInfo,
  workExperiences,
  languagesSection,
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

const LANGS = [
  {code: "en", match: "English", label: "English"},
  {code: "si", match: "Sinhala", label: "සිංහල"},
  {code: "ta", match: "Tamil", label: "தமிழ்"}
];

export default function About() {
  const [lang, setLang] = useState("en");
  const go = id => e => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: "smooth"});
  };
  const paras = aboutSection.paragraphs || [];
  // right-hand text next to the photo (falls back to English when a translation is empty)
  const texts = {
    en: aboutSection.rightText || paras[2] || "",
    si: aboutSection.rightTextSi,
    ta: aboutSection.rightTextTa
  };
  const rightText = texts[lang] || texts.en;
  // everything else stays available as cards below
  const restParas = paras.filter((p, i) => !(i === 2 && !aboutSection.rightText));
  const nameParts = (aboutSection.displayName || "").split(" ");
  const first = nameParts.shift() || "";
  const rest = nameParts.join(" ");
  const photo = aboutSection.photo || badge.photo;
  const proficiency = name => {
    const hit = (languagesSection.languages || []).find(l => l.name === name);
    return hit ? hit.level : "";
  };
  return (
    <section id="about" className="section about-sec">
      <Reveal as="h2" className="about-title">{aboutSection.title}</Reveal>
      {aboutSection.display !== false && (
        <>
          <Reveal className="about-intro">
            <h3>
              <span className="about-hi">{aboutSection.greetingLine}</span> {first} {rest}
            </h3>
            <a href="#contact" className="btn-primary" onClick={go("contact")}>
              <i className="far fa-envelope" /> {aboutSection.primaryButton}
            </a>
          </Reveal>

          <div className="about-hero">
            {/* LEFT: language switcher + View Projects, stacked, centred against the photo */}
            <Reveal className="about-left" delay={0.05}>
              {languagesSection.display !== false && (
                <div className="lang-switch" role="group" aria-label="Language">
                  {LANGS.map(l => (
                    <button
                      key={l.code}
                      type="button"
                      className={lang === l.code ? "on" : ""}
                      aria-pressed={lang === l.code}
                      title={proficiency(l.match)}
                      lang={l.code}
                      onClick={() => setLang(l.code)}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
              <a href="#portfolio" className="btn-ghost" onClick={go("portfolio")}>
                <i className="fas fa-code" /> {aboutSection.secondaryButton}
              </a>
            </Reveal>

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

            {/* RIGHT: ISEF text, vertically centred against the photo, fades in on scroll */}
            <Reveal className="about-right" delay={0.2}>
              <p key={lang} lang={lang} className="about-right-text">{rightText}</p>
            </Reveal>
          </div>
        </>
      )}

      {restParas.length > 0 && (
        <div className="about-more">
          {restParas.map((p, i) => (
            <Reveal key={i} className="about-more-card" delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
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
