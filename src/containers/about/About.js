import React, {useContext} from "react";
import "./About.scss";
import {Fade} from "react-reveal";
import {aboutSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function About() {
  const {isDark} = useContext(StyleContext);
  if (!aboutSection.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="about">
        <div className="about-main-div">
          <h1 className={isDark ? "about-heading dark-mode" : "about-heading"}>
            {aboutSection.title}
          </h1>
          <div className="about-paragraphs">
            {(aboutSection.paragraphs || []).map((para, i) => (
              <p
                key={i}
                className={
                  isDark ? "about-paragraph dark-mode" : "about-paragraph subTitle"
                }
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Fade>
  );
}
