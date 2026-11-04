import React, {useCallback, useState} from "react";
import Loader from "./Loader";
import Starfield from "./Starfield";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Portfolio from "./Portfolio";
import Skills from "./Skills";
import Music from "./Music";
import Comments from "./Comments";
import Contact from "./Contact";
import Footer from "./Footer";
import "./v2.scss";

export default function Main() {
  const [ready, setReady] = useState(false); // site mounted (under the loader)
  const [live, setLive] = useState(false); // loader is revealing: start intro animations
  const [loading, setLoading] = useState(true);
  const mount = useCallback(() => setReady(true), []);
  const reveal = useCallback(() => setLive(true), []);
  const done = useCallback(() => setLoading(false), []);
  return (
    <div className={`v2 ${live ? "is-live" : ""}`}>
      <Starfield />
      <div className="aurora" aria-hidden="true" />
      {loading && <Loader onMount={mount} onReveal={reveal} onDone={done} />}
      {ready && (
        <>
          <Nav />
          <main>
            <Hero live={live} />
            <About />
            <Portfolio />
            <Skills />
            <Music />
            <Comments />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
