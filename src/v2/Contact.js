import React, {useState} from "react";
import {contactInfo, socialMediaLinks} from "../portfolio";
import {Reveal, SectionHead} from "./Section";

export default function Contact() {
  const [form, setForm] = useState({name: "", email: "", message: ""});
  const [status, setStatus] = useState({state: "idle", msg: ""});
  const upd = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({state: "error", msg: "Please fill in all fields."});
      return;
    }
    setStatus({state: "sending", msg: ""});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("x");
      setStatus({state: "sent", msg: "Message sent - I'll get back to you soon."});
      setForm({name: "", email: "", message: ""});
    } catch (_) {
      setStatus({state: "error", msg: "Couldn't send - please email me directly."});
    }
  };

  return (
    <section id="contact" className="section">
      <SectionHead
        title="Let's"
        accent="work together"
        sub="Discuss a project, a role, or just say hi - my inbox is open. Available for remote and relocation opportunities."
      />
      <div className="contact-grid">
        <Reveal className="contact-info">
          {contactInfo.email_address && (
            <a href={`mailto:${contactInfo.email_address}`}>
              <i className="far fa-envelope" /> {contactInfo.email_address}
            </a>
          )}
          {contactInfo.number && (
            <a href={`tel:${contactInfo.number}`}>
              <i className="fas fa-phone" /> {contactInfo.number}
            </a>
          )}
          {socialMediaLinks.linkedin && (
            <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in" /> LinkedIn
            </a>
          )}
          {socialMediaLinks.github && (
            <a href={socialMediaLinks.github} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" /> GitHub
            </a>
          )}
          {socialMediaLinks.medium && (
            <a href={socialMediaLinks.medium} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-medium-m" /> Medium
            </a>
          )}
        </Reveal>
        <Reveal delay={0.1}>
          <form className="gb-form" onSubmit={submit}>
            <label>
              Name
              <input name="name" value={form.name} onChange={upd} placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={upd} placeholder="you@example.com" />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} value={form.message} onChange={upd} placeholder="Tell me about your project..." />
            </label>
            <button className="btn-primary" disabled={status.state === "sending"}>
              {status.state === "sending" ? "Sending..." : "Send message"} <i className="far fa-paper-plane" />
            </button>
            {status.msg && <p className={`form-msg ${status.state}`}>{status.msg}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
