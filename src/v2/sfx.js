// Tiny WebAudio blips for UI feedback. Off by default (browsers block autoplay anyway).
let ctx = null;
let enabled = false;
export function setSound(on) {
  enabled = on;
  if (on && !ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (_) {}
  }
}
export function isSound() {
  return enabled;
}
export function blip(freq = 520, dur = 0.09) {
  if (!enabled || !ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(freq, ctx.currentTime);
  o.frequency.exponentialRampToValueAtTime(freq * 1.6, ctx.currentTime + dur);
  g.gain.setValueAtTime(0.06, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + dur);
}
