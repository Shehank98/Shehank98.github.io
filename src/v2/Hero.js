import React, {useEffect, useState} from "react";
import Badge3D from "./Badge3D";
import {heroSection, socialMediaLinks, greeting} from "../portfolio";

function useTypewriter(words) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!words || !words.length) return undefined;
    let w = 0;
    let c = 0;
    let del = false;
    let t;
    const loop = () => {
      const word = words[w];
      c += del ? -1 : 1;
      setText(word.slice(0, c));
      let delay = del ? 28 : 55;
      if (!del && c === word.length) {
        del = true;
        delay = 1500;
      } else if (del && c === 0) {
        del = false;
        w = (w + 1) % words.length;
        delay = 350;
      }
      t = setTimeout(loop, delay);
    };
    t = setTimeout(loop, 600);
    return () => clearTimeout(t);
  }, [words]);
  return text;
}

export default function Hero({live = true}) {
  const typed = useTypewriter(heroSection.roles);
  const go = id => e => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: "smooth"});
  };
  return (
    <section id="home" className="hero">
      <div className="hero-text">
        <h1 className="hero-title">
          <span className="grad reveal-up" style={{"--d": "0.1s"}}>
            {heroSection.welcome}
          </span>
          <span className="reveal-up" style={{"--d": "0.25s"}}>
            {heroSection.headline}
          </span>
        </h1>
        <p className="hero-role reveal-up" style={{"--d": "0.4s"}}>
          {typed}
          <i className="caret" />
        </p>
        <p className="hero-intro reveal-up" style={{"--d": "0.55s"}}>
          {heroSection.intro}
        </p>
        <div className="hero-cta reveal-up" style={{"--d": "0.7s"}}>
          <a href="#portfolio" className="btn-primary" onClick={go("portfolio")}>
            {heroSection.primaryButton} <i className="fas fa-arrow-right" />
          </a>
          <a href="#contact" className="btn-ghost" onClick={go("contact")}>
            {heroSection.secondaryButton} <i className="far fa-paper-plane" />
          </a>
          {greeting.resumeLink && (
            <a
              href={greeting.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Resume <i className="fas fa-download" />
            </a>
          )}
        </div>
        {socialMediaLinks.display && (
          <div className="hero-social reveal-up" style={{"--d": "0.85s"}}>
            <span>FIND ME</span>
            {socialMediaLinks.github && (
              <a href={socialMediaLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github" />
              </a>
            )}
            {socialMediaLinks.linkedin && (
              <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" />
              </a>
            )}
            {socialMediaLinks.medium && (
              <a href={socialMediaLinks.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium">
                <i className="fab fa-medium-m" />
              </a>
            )}
            {socialMediaLinks.gmail && (
              <a href={`mailto:${socialMediaLinks.gmail}`} aria-label="Email">
                <i className="far fa-envelope" />
              </a>
            )}
          </div>
        )}
      </div>
      <div className="hero-badge">
        <Badge3D live={live} />
      </div>
    </section>
  );
}
