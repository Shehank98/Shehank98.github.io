import React from "react";
import {socialMediaLinks, badge} from "../portfolio";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-in">
        <div className="footer-social">
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
        </div>
        <p>© {new Date().getFullYear()} {badge.name}. All rights reserved.</p>
        <button
          className="btn-ghost"
          onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
        >
          Back to top <i className="fas fa-arrow-up" />
        </button>
      </div>
    </footer>
  );
}
