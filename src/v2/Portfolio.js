import React, {useCallback, useEffect, useMemo, useState} from "react";
import {bigProjects, achievementSection, honorsSection, skillsSection, techStack} from "../portfolio";
import {Reveal} from "./Section";
import {blip} from "./sfx";

const PAGE = 6;

export function youtubeId(url) {
  const m = String(url || "").match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : "";
}

function Media({item}) {
  const [bad, setBad] = useState(false);
  const yt = youtubeId(item.video);
  const src = item.image || (yt && !bad ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : "");
  return (
    <div className={`pc-media ${item.contain ? "contain" : ""}`}>
      {src ? (
        <img src={src} alt={item.alt || item.title} draggable="false" loading="lazy" onError={() => setBad(true)} />
      ) : (
        <i className={item.icon || "fas fa-cube"} />
      )}
      {yt && (
        <span className="pc-play" aria-hidden="true">
          <i className="fas fa-play" />
        </span>
      )}
      {item.badge && <span className="pc-badge">{item.badge}</span>}
    </div>
  );
}

function Card({item, index, onOpen}) {
  return (
    <Reveal className="pcard-wrap" delay={(index % 3) * 0.07}>
      <article
        className="pcard"
        tabIndex={0}
        onClick={() => onOpen(item)}
        onKeyDown={e => (e.key === "Enter" ? onOpen(item) : null)}
      >
        <Media item={item} />
        <h3>{item.title}</h3>
        {item.meta && <span className="pc-meta">{item.meta}</span>}
        {item.desc && <p>{item.desc}</p>}
        <span className="pc-more">
          {item.video ? (
            <>
              <i className="fas fa-play-circle" /> Watch &amp; details
            </>
          ) : (
            <>
              Details <i className="fas fa-arrow-right" />
            </>
          )}
        </span>
      </article>
    </Reveal>
  );
}

function Modal({item, items, onClose, onStep}) {
  const yt = youtubeId(item.video);
  const idx = items.indexOf(item);
  return (
    <div className="proj-modal" role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="pm-bg" onClick={onClose} />
      <div className="pm-panel" key={item.title}>
        <button className="pm-close" onClick={onClose} aria-label="Close">
          <i className="fas fa-times" />
        </button>
        <div className="pm-media">
          {yt ? (
            <iframe
              title={item.title}
              src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : item.image ? (
            <img src={item.image} alt={item.alt || item.title} />
          ) : (
            <i className={item.icon || "fas fa-cube"} />
          )}
        </div>
        <div className="pm-body">
          <span className="kicker">
            {item.kind} {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <h3>{item.title}</h3>
          {item.meta && <span className="pc-meta">{item.meta}</span>}
          {item.desc && <p>{item.desc}</p>}
          <div className="pm-links">
            {(item.links || []).map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {l.name} <i className="fas fa-external-link-alt" />
              </a>
            ))}
            {item.video && (
              <a href={item.video} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <i className="fab fa-youtube" /> Open on YouTube
              </a>
            )}
          </div>
          {items.length > 1 && (
            <div className="pm-nav">
              <button onClick={() => onStep(-1)} className="btn-ghost">
                <i className="fas fa-arrow-left" /> Prev
              </button>
              <button onClick={() => onStep(1)} className="btn-ghost">
                Next <i className="fas fa-arrow-right" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const data = useMemo(() => {
    const projects = (bigProjects.projects || []).map(p => ({
      kind: "PROJECT",
      title: p.projectName,
      desc: p.projectDesc,
      image: p.image,
      links: p.footerLink,
      icon: "fas fa-cube"
    }));
    const certs = (achievementSection.achievementsCards || []).map(c => ({
      kind: "CERTIFICATE",
      title: c.title,
      meta: c.subtitle,
      desc: "",
      image: c.image,
      contain: true,
      links: (c.footerLink || []).map(l => ({name: l.name || "Credential", url: l.url})),
      icon: "fas fa-certificate"
    }));
    const awards = (honorsSection.awards || []).map(a => ({
      kind: "AWARD",
      title: a.title,
      meta: a.date,
      desc: a.description,
      image: a.image,
      video: a.video,
      alt: a.imageAlt,
      badge: a.video ? "VIDEO" : "",
      icon: "fas fa-trophy"
    }));
    return {projects, certs, awards};
  }, []);

  const tabs = [
    {id: "projects", label: "Projects", icon: "fas fa-code", items: data.projects},
    {id: "certs", label: "Certificates", icon: "fas fa-award", items: data.certs},
    {id: "awards", label: "Achievements", icon: "fas fa-trophy", items: data.awards},
    {id: "stack", label: "Tech Stack", icon: "fas fa-microchip", items: []}
  ].filter(t => t.id === "stack" || t.items.length);

  const [tab, setTab] = useState("projects");
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState(null);
  const current = tabs.find(t => t.id === tab) || tabs[0];

  const pick = id => {
    setTab(id);
    setShown(PAGE);
    blip(560);
  };

  const step = useCallback(
    d => {
      setOpen(o => {
        if (!o) return o;
        const list = current.items;
        const i = list.indexOf(o);
        return list[(i + d + list.length) % list.length];
      });
    },
    [current]
  );
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return undefined;
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
  const items = current.items.slice(0, shown);

  return (
    <section id="portfolio" className="section">
      <Reveal as="h2" className="about-title port-title">Portfolio</Reveal>
      <Reveal className="port-sub">{bigProjects.subtitle}</Reveal>

      <Reveal className="tabs" role="tablist" delay={0.1}>
        {tabs.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`tab ${tab === t.id ? "on" : ""}`}
            onClick={() => pick(t.id)}
          >
            <i className={t.icon} /> {t.label}
            {t.items.length > 0 && <em>{t.items.length}</em>}
          </button>
        ))}
      </Reveal>

      <div className="tab-panel" key={tab}>
        {tab === "stack" ? (
          <div className="stack-wrap">
            <div className="stack-grid">
              {(skillsSection.softwareSkills || []).map((s, i) => (
                <div className="stack-tile" key={i} style={{animationDelay: `${i * 0.03}s`}}>
                  <i className={s.fontAwesomeClassname} />
                  <span>{s.skillName}</span>
                </div>
              ))}
            </div>
            {techStack.viewSkillBars && (
              <div className="stack-bars">
                {techStack.experience.map((e, i) => (
                  <div className="bar" key={i}>
                    <div className="bar-top">
                      <span>{e.Stack}</span>
                      <b>{e.progressPercentage}</b>
                    </div>
                    <div className="bar-track">
                      <i style={{width: e.progressPercentage, animationDelay: `${i * 0.12}s`}} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="pgrid">
              {items.map((it, i) => (
                <Card key={it.title + i} item={it} index={i} onOpen={setOpen} />
              ))}
            </div>
            {current.items.length > PAGE && (
              <div className="more-row">
                {shown < current.items.length ? (
                  <button className="btn-ghost" onClick={() => setShown(s => s + PAGE)}>
                    Show more <i className="fas fa-chevron-down" />
                  </button>
                ) : (
                  <button className="btn-ghost" onClick={() => setShown(PAGE)}>
                    Show less <i className="fas fa-chevron-up" />
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {open && <Modal item={open} items={current.items} onClose={close} onStep={step} />}
    </section>
  );
}
