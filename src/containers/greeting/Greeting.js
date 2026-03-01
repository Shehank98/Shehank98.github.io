import React, {useContext} from "react";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <Fade bottom duration={800} distance="28px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">

          {/* ===== LEFT: Text ===== */}
          <div className="greeting-text-div">
            <span className="greeting-tag-badge">
              {emoji("🚀")} Open for opportunities
            </span>
            <h1 className="greeting-text">
              {greeting.title}
              <span className="wave-emoji">{emoji("👋")}</span>
            </h1>
            <p className="greeting-text-p">{greeting.subTitle}</p>
            <SocialMedia />
            <div className="button-greeting-div">
              <Button text="Contact me" href="#contact" />
              {greeting.resumeLink && (
                <a
                  href={require("./resume.pdf")}
                  download="Resume.pdf"
                  className="download-link-button"
                >
                  <Button text="Download CV" />
                </a>
              )}
            </div>
          </div>

          {/* ===== RIGHT: Profile Photo ===== */}
          <div className="greeting-image-div">
            <div className="profile-photo-wrap">
              <div className="profile-ring">
                {greeting.profileImage ? (
                  <img
                    src={greeting.profileImage}
                    alt={greeting.username}
                    className="profile-photo"
                  />
                ) : (
                  <div className={isDark ? "profile-initials dark" : "profile-initials"}>
                    SK
                  </div>
                )}
              </div>
              <span className="float-badge badge-ml">{emoji("🧠")} ML Engineer</span>
              <span className="float-badge badge-py">{emoji("🐍")} Python</span>
              <span className="float-badge badge-ds">{emoji("📊")} Data Science</span>
            </div>
          </div>

        </div>
      </div>
    </Fade>
  );
}
