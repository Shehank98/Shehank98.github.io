import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as portfolio from "./portfolio";

// Section key (as stored by the admin backend) -> the live portfolio object.
// Backend overrides are shallow-merged onto these defaults, so any section the
// admin hasn't edited keeps its original hardcoded values (and bundled images).
const SECTION_MAP = {
  greeting: portfolio.greeting,
  splashScreen: portfolio.splashScreen,
  socialMediaLinks: portfolio.socialMediaLinks,
  skillsSection: portfolio.skillsSection,
  workExperiences: portfolio.workExperiences,
  bigProjects: portfolio.bigProjects,
  openSource: portfolio.openSource,
  achievementSection: portfolio.achievementSection,
  blogSection: portfolio.blogSection,
  linkedinRecommendations: portfolio.linkedinRecommendations,
  resumeSection: portfolio.resumeSection,
  contactInfo: portfolio.contactInfo
};

function applyOverrides(overrides) {
  if (!overrides || typeof overrides !== "object") return;
  Object.keys(overrides).forEach(key => {
    const target = SECTION_MAP[key];
    if (target && overrides[key] && typeof overrides[key] === "object") {
      Object.assign(target, overrides[key]);
    }
  });
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

// Pull admin-managed content first, then render. Falls back to defaults if the
// backend is unavailable so the site always renders.
fetch("/api/content")
  .then(res => (res.ok ? res.json() : null))
  .then(applyOverrides)
  .catch(() => {})
  .finally(render);

serviceWorker.unregister();
