import React, {useContext, useState} from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import {contactInfo} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Contact() {
  const {isDark} = useContext(StyleContext);
  const [form, setForm] = useState({name: "", email: "", message: ""});
  const [status, setStatus] = useState({state: "idle", msg: ""});

  const update = e => setForm({...form, [e.target.name]: e.target.value});

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
      if (!res.ok) throw new Error("Failed");
      setStatus({state: "sent", msg: "Thanks! Your message has been sent."});
      setForm({name: "", email: "", message: ""});
    } catch (_) {
      setStatus({
        state: "error",
        msg: "Couldn't send right now — please email me directly."
      });
    }
  };

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main contact-margin-top" id="contact">
        <div className="contact-div-main">
          <div className="contact-header">
            <h1 className="heading contact-title">{contactInfo.title}</h1>
            <p
              className={
                isDark
                  ? "dark-mode contact-subtitle"
                  : "subTitle contact-subtitle"
              }
            >
              {contactInfo.subtitle}
            </p>
            <div
              className={
                isDark ? "dark-mode contact-text-div" : "contact-text-div"
              }
            >
              {contactInfo.number && (
                <>
                  <a
                    className="contact-detail"
                    href={"tel:" + contactInfo.number}
                  >
                    {contactInfo.number}
                  </a>
                  <br />
                  <br />
                </>
              )}
              <a
                className="contact-detail-email"
                href={"mailto:" + contactInfo.email_address}
              >
                {contactInfo.email_address}
              </a>
              <br />
              <br />
              <SocialMedia />
            </div>
          </div>

          <div className="contact-form-div">
            <form
              className={isDark ? "contact-form dark" : "contact-form"}
              onSubmit={submit}
            >
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={update}
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={update}
              />
              <textarea
                name="message"
                placeholder="Your message"
                rows="5"
                value={form.message}
                onChange={update}
              />
              <button type="submit" disabled={status.state === "sending"}>
                {status.state === "sending" ? "Sending…" : "Send message"}
              </button>
              {status.msg && (
                <p
                  className={
                    status.state === "error" ? "form-msg err" : "form-msg ok"
                  }
                >
                  {status.msg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </Fade>
  );
}
