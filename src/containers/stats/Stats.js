import React, {useContext} from "react";
import "./Stats.scss";
import {Fade} from "react-reveal";
import {statsSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Stats() {
  const {isDark} = useContext(StyleContext);
  if (!statsSection.display || !(statsSection.stats || []).length) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="stats">
        <div className={isDark ? "stats-grid dark-mode" : "stats-grid"}>
          {statsSection.stats.map((stat, i) => (
            <div className={isDark ? "stat-tile dark" : "stat-tile"} key={i}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  );
}
