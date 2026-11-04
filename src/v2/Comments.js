import React, {useEffect, useState} from "react";
import {commentsSection} from "../portfolio";
import {Reveal, SectionHead} from "./Section";

function ago(ts) {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  const u = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"]
  ];
  for (const [n, l] of u) {
    if (s >= n) {
      const v = Math.floor(s / n);
      return `${v} ${l}${v > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

const hue = name => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
};

export default function Comments() {
  const [list, setList] = useState([]);
  const [offline, setOffline] = useState(false);
  const [form, setForm] = useState({name: "", comment: ""});
  const [status, setStatus] = useState({state: "idle", msg: ""});

  const load = () =>
    fetch("/api/comments")
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(d => {
        setList(Array.isArray(d) ? d : []);
        setOffline(false);
      })
      .catch(() => setOffline(true));

  useEffect(() => {
    load();
  }, []);

  if (commentsSection.display === false) return null;

  const submit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      setStatus({state: "error", msg: "Please add your name and a comment."});
      return;
    }
    setStatus({state: "sending", msg: ""});
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed");
      setForm({name: form.name, comment: ""});
      setStatus({state: "sent", msg: "Thanks! Your comment is live."});
      load();
    } catch (err) {
      setStatus({state: "error", msg: err.message || "Couldn't post right now."});
    }
  };

  return (
    <section id="guestbook" className="section">
      <SectionHead
        kicker="06 / GUESTBOOK"
        title={commentsSection.title}
        accent={`(${list.length})`}
        sub={commentsSection.subtitle}
      />
      <div className="gb-grid">
        <Reveal className="gb-list" aria-live="polite">
          {offline && <p className="gb-empty">Comments are unavailable right now.</p>}
          {!offline && list.length === 0 && <p className="gb-empty">Be the first to leave a note</p>}
          {list.map(c => (
            <div className="gb-item" key={c.id}>
              <div className="gb-av" style={{background: `hsl(${hue(c.name)} 70% 55%)`}}>
                {c.name.trim().charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="gb-meta">
                  <strong>{c.name}</strong>
                  <span>{ago(c.created)}</span>
                </div>
                <p>{c.comment}</p>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="gb-form-wrap" delay={0.1}>
          <form className="gb-form" onSubmit={submit}>
            <label>
              Name
              <input
                value={form.name}
                maxLength={60}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Your name"
              />
            </label>
            <label>
              Comment
              <textarea
                rows={4}
                value={form.comment}
                maxLength={500}
                onChange={e => setForm({...form, comment: e.target.value})}
                placeholder="Say hi, share feedback..."
              />
            </label>
            <button className="btn-primary" disabled={status.state === "sending"}>
              {status.state === "sending" ? "Sending..." : "Post comment"} <i className="far fa-paper-plane" />
            </button>
            {status.msg && <p className={`form-msg ${status.state}`}>{status.msg}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
