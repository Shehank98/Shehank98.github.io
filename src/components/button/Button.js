import React from "react";
import "./Button.scss";

export default function Button({text, className, href, newTab, download}) {
  return (
    <div className={className}>
      <a
        className="main-button"
        href={href}
        download={download}
        target={newTab && "_blank"}
      >
        {text}
      </a>
    </div>
  );
}
