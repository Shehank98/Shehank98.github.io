import React, {useCallback, useState} from "react";
import Loader from "./Loader";
import Starfield from "./Starfield";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Music from "./Music";
import Comments from "./Comments";
import Contact from "./Contact";
import Footer from "./Footer";
import "./v2.scss";

export default function Main() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const reveal = useCallback(() => setReady(true), []);
  const done = useCallback(() => setLoading(false), []);
  return (
    <div className="v2">
      <Starfield />
      <div className="aurora" aria-hidden="true" />
      {loading && <Loader onReveal={reveal} onDone={done} />}
      {ready && (
        <>
          <Nav />
          <main>
            <Hero />
            <About />
            <Projects />
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
