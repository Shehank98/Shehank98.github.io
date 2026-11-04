import React from "react";
import {useInView} from "./hooks";

export function Reveal({children, className = "", delay = 0, as: Tag = "div", ...rest}) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? "in" : ""} ${className}`}
      style={{"--d": `${delay}s`}}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({kicker, title, accent, sub}) {
  return (
    <Reveal className="sec-head">
      {kicker && <span className="kicker">{kicker}</span>}
      <h2>
        {title} {accent && <span className="grad">{accent}</span>}
      </h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  );
}
