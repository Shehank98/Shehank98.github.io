import React from "react";
import {musicSection} from "../portfolio";
import {Reveal} from "./Section";

export default function Music() {
  if (musicSection.display === false) return null;
  return (
    <section className="section music-sec">
      <Reveal className="music-card">
        <div className="music-text">
          <h2>
            {musicSection.heading}
            <br />
            <span className="grad">{musicSection.headingAccent}</span>
          </h2>
          <p>{musicSection.text}</p>
          <a className="btn-ghost" href={musicSection.spotifyUrl} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-spotify" /> {musicSection.buttonText}
          </a>
          <div className="eq" aria-hidden="true">
            {Array.from({length: 18}).map((_, i) => (
              <i key={i} style={{animationDelay: `${(i % 6) * 0.12}s`, animationDuration: `${0.8 + (i % 5) * 0.18}s`}} />
            ))}
          </div>
        </div>
        <div className="music-embed">
          <iframe
            title="Spotify playlist"
            src={musicSection.embedUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </Reveal>
    </section>
  );
}
