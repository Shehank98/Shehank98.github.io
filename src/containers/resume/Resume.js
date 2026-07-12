import React, {useContext} from "react";
import "./Resume.scss";
import {Fade} from "react-reveal";
import {resumeSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Resume() {
  const {isDark} = useContext(StyleContext);
  if (!resumeSection.display || !resumeSection.resumeLink) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="resume">
        <div className={isDark ? "resume-card dark" : "resume-card"}>
          <div className="resume-text">
            <h1 className="resume-heading">{resumeSection.title}</h1>
            <p className="resume-subtitle">{resumeSection.subtitle}</p>
          </div>
          <a
            className="resume-btn"
            href={resumeSection.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </div>
      </div>
    </Fade>
  );
}
