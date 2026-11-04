import React, {useContext} from "react";
import "./Languages.scss";
import {Fade} from "react-reveal";
import {languagesSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Languages() {
  const {isDark} = useContext(StyleContext);
  if (!languagesSection.display || !(languagesSection.languages || []).length) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="languages">
        <div className="languages-main-div">
          <h1 className="languages-heading">{languagesSection.title}</h1>
          <div className="languages-grid">
            {languagesSection.languages.map((lang, i) => (
              <div className={isDark ? "language-card dark" : "language-card"} key={i}>
                <div className="language-name">{lang.name}</div>
                <div className="language-level">{lang.level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fade>
  );
}
