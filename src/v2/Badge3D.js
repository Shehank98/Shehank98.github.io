import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import QRCode from "qrcode";
import {badge} from "../portfolio";

/*
 * Draggable 3D ID badge on a swinging lanyard.
 *  - Lanyard = verlet rope chain (own physics, no wasm / no React upgrade)
 *  - Drag the card to swing it, flick sideways to spin it, double-click (or tap
 *    the Flip button) to turn it around and show the QR code on the back.
 */

const CARD_W = 1.7;
const CARD_H = 2.45;
const CARD_D = 0.045;
const SEGMENTS = 5;
const SEG_LEN = 0.56;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const DISPLAY = "'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif";
const BODY = "'Inter', 'Montserrat', Arial, sans-serif";
const INK = "#16130f";
const PAPER = "#ebe3c8";

// fit text to a max width by shrinking the font; returns the final size
function fitFont(c, text, weight, family, max, start, min) {
  let size = start;
  c.font = `${weight} ${size}px ${family}`;
  while (c.measureText(text).width > max && size > min) {
    size -= 2;
    c.font = `${weight} ${size}px ${family}`;
  }
  return size;
}

// cream paper: grain, stains, soft vignette
function paper(c, W, H) {
  c.fillStyle = PAPER;
  c.fillRect(0, 0, W, H);
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < 9000; i++) {
    c.fillStyle = `rgba(${90 + rnd() * 60},${70 + rnd() * 50},${40},${rnd() * 0.07})`;
    c.fillRect(rnd() * W, rnd() * H, 1 + rnd() * 2, 1 + rnd() * 2);
  }
  for (let i = 0; i < 7; i++) {
    const g = c.createRadialGradient(rnd() * W, rnd() * H, 5, rnd() * W, rnd() * H, 120 + rnd() * 160);
    g.addColorStop(0, "rgba(120,90,40,0.07)");
    g.addColorStop(1, "rgba(120,90,40,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);
  }
  const v = c.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.75);
  v.addColorStop(0, "rgba(0,0,0,0)");
  v.addColorStop(1, "rgba(60,40,10,0.28)");
  c.fillStyle = v;
  c.fillRect(0, 0, W, H);
}

function cornerMarks(c, W, H) {
  c.strokeStyle = INK;
  c.lineWidth = 2;
  const m = 26;
  const s = 7;
  [[m, 175], [W - m, 175], [m, H - 150], [W - m, H - 150]].forEach(([x, y]) => {
    c.beginPath();
    c.moveTo(x - s, y - s);
    c.lineTo(x + s, y + s);
    c.moveTo(x + s, y - s);
    c.lineTo(x - s, y + s);
    c.stroke();
  });
}

function slot(c, W) {
  c.fillStyle = "#0e0c09";
  roundRect(c, W / 2 - 62, 34, 124, 30, 15);
  c.fill();
}

function drawFront(canvas, photoImg) {
  const W = canvas.width;
  const H = canvas.height;
  const c = canvas.getContext("2d");
  c.clearRect(0, 0, W, H);
  c.save();
  roundRect(c, 0, 0, W, H, 40);
  c.clip();
  paper(c, W, H);
  slot(c, W);
  cornerMarks(c, W, H);

  // tag + company row
  c.fillStyle = INK;
  const tag = (badge.tag || "").toUpperCase();
  c.font = `400 34px ${DISPLAY}`;
  const tw = c.measureText(tag).width + 36;
  roundRect(c, 44, 90, tw, 50, 6);
  c.fill();
  c.fillStyle = PAPER;
  c.textAlign = "left";
  c.textBaseline = "middle";
  c.fillText(tag, 62, 116);
  c.fillStyle = INK;
  c.textAlign = "right";
  c.font = `400 36px ${DISPLAY}`;
  c.fillText((badge.company || "").toUpperCase(), W - 44, 106);
  c.font = `600 15px ${BODY}`;
  c.fillText("ID " + (badge.idNumber || ""), W - 44, 134);

  // giant headline
  const head = (badge.headline || "").toUpperCase();
  c.textAlign = "left";
  c.fillStyle = INK;
  fitFont(c, head, 400, DISPLAY, W - 88, 190, 60);
  c.textBaseline = "alphabetic";
  c.fillText(head, 42, 290);

  // photo frame
  const px = 44;
  const py = 322;
  const pw = W - 130;
  const ph = 400;
  c.save();
  roundRect(c, px, py, pw, ph, 10);
  c.clip();
  c.fillStyle = "#0b0b0d";
  c.fillRect(px, py, pw, ph);
  if (photoImg) {
    const r = Math.max(pw / photoImg.width, ph / photoImg.height);
    const iw = photoImg.width * r;
    const ih = photoImg.height * r;
    // anchor toward the top so the face stays in frame
    c.drawImage(photoImg, px + (pw - iw) / 2, py - (ih - ph) * 0.12, iw, ih);
  } else {
    const pg = c.createLinearGradient(px, py, px + pw, py + ph);
    pg.addColorStop(0, "#2b2a35");
    pg.addColorStop(1, "#0f0f14");
    c.fillStyle = pg;
    c.fillRect(px, py, pw, ph);
    c.fillStyle = "rgba(255,255,255,0.14)";
    c.beginPath();
    c.arc(px + pw / 2, py + 150, 74, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.ellipse(px + pw / 2, py + ph + 10, 160, 170, 0, Math.PI, 0);
    c.fill();
  }
  c.restore();
  c.strokeStyle = INK;
  c.lineWidth = 4;
  roundRect(c, px, py, pw, ph, 10);
  c.stroke();

  // vertical side text
  c.save();
  c.translate(W - 62, py + ph);
  c.rotate(-Math.PI / 2);
  c.fillStyle = INK;
  c.textAlign = "left";
  c.textBaseline = "middle";
  const side = (badge.sideText || "").toUpperCase();
  fitFont(c, side, 400, DISPLAY, ph, 66, 24);
  c.fillText(side, 0, 0);
  c.restore();

  // name label overlapping the photo
  const name = (badge.name || "").toUpperCase();
  c.textBaseline = "alphabetic";
  c.textAlign = "center";
  const lw = pw - 44;
  const lx = px + 22;
  const ly = py + ph - 70;
  c.fillStyle = PAPER;
  roundRect(c, lx, ly, lw, 92, 8);
  c.fill();
  c.strokeStyle = INK;
  c.lineWidth = 3;
  roundRect(c, lx, ly, lw, 92, 8);
  c.stroke();
  c.fillStyle = INK;
  fitFont(c, name, 400, DISPLAY, lw - 28, 46, 24);
  c.fillText(name, lx + lw / 2, ly + 44);
  const role = badge.role || "";
  fitFont(c, role, 600, BODY, lw - 28, 19, 11);
  c.fillText(role, lx + lw / 2, ly + 74);

  // footer: big word + barcode + note
  c.textAlign = "left";
  c.fillStyle = INK;
  fitFont(c, (badge.footerText || "").toUpperCase(), 400, DISPLAY, W * 0.52, 84, 30);
  c.fillText((badge.footerText || "").toUpperCase(), 40, H - 66);
  c.font = `600 17px ${BODY}`;
  c.fillText(badge.footerNote || "", W - 270, H - 60);
  let x = W - 270;
  let sd = 5;
  while (x < W - 44) {
    sd = (sd * 9301 + 49297) % 233280;
    const bw = 2 + (sd % 4);
    c.fillRect(x, H - 128, bw, 46);
    x += bw + 3 + (sd % 2);
  }
  c.restore();
}

function drawBack(canvas, qrCanvas) {
  const W = canvas.width;
  const H = canvas.height;
  const c = canvas.getContext("2d");
  c.clearRect(0, 0, W, H);
  c.save();
  roundRect(c, 0, 0, W, H, 40);
  c.clip();
  paper(c, W, H);
  slot(c, W);

  // "SCAN HERE" tag with stripes
  c.save();
  c.translate(44, 128);
  c.rotate(-0.06);
  c.fillStyle = INK;
  c.textAlign = "left";
  c.textBaseline = "alphabetic";
  c.font = `400 58px ${DISPLAY}`;
  c.fillText((badge.qrCaption || "SCAN HERE").toUpperCase(), 0, 0);
  for (let i = 0; i < 4; i++) {
    c.beginPath();
    c.moveTo(i * 38, 22);
    c.lineTo(i * 38 + 26, 22);
    c.lineTo(i * 38 + 16, 40);
    c.lineTo(i * 38 - 10, 40);
    c.closePath();
    c.fill();
  }
  c.restore();
  c.fillStyle = INK;
  c.textAlign = "right";
  c.font = `400 34px ${DISPLAY}`;
  c.fillText((badge.company || "").toUpperCase(), W - 44, 112);

  // dark QR panel
  const px = 50;
  const py = 200;
  const pw = W - 150;
  const ph = 520;
  c.fillStyle = "#23232b";
  roundRect(c, px, py, pw, ph, 14);
  c.fill();
  c.strokeStyle = INK;
  c.lineWidth = 4;
  roundRect(c, px, py, pw, ph, 14);
  c.stroke();
  c.fillStyle = PAPER;
  c.textAlign = "center";
  const title = (badge.qrTitle || "").toUpperCase();
  fitFont(c, title, 400, DISPLAY, pw - 40, 50, 24);
  c.fillText(title, px + pw / 2, py + 72);
  // dashed rule
  c.strokeStyle = PAPER;
  c.lineWidth = 2;
  c.setLineDash([10, 8]);
  c.beginPath();
  c.moveTo(px + 30, py + 96);
  c.lineTo(px + pw - 30, py + 96);
  c.stroke();
  c.setLineDash([]);
  const qs = 330;
  const qx = px + (pw - qs) / 2;
  const qy = py + 140;
  c.fillStyle = PAPER;
  roundRect(c, qx - 22, qy - 22, qs + 44, qs + 44, 12);
  c.fill();
  if (qrCanvas) {
    c.imageSmoothingEnabled = false;
    c.drawImage(qrCanvas, qx, qy, qs, qs);
  }

  // vertical side text
  c.save();
  c.translate(W - 62, py + ph);
  c.rotate(-Math.PI / 2);
  c.fillStyle = INK;
  c.textAlign = "left";
  c.textBaseline = "middle";
  const side = (badge.sideText || "").toUpperCase();
  fitFont(c, side, 400, DISPLAY, ph, 66, 24);
  c.fillText(side, 0, 0);
  c.restore();

  // name plate
  c.textBaseline = "alphabetic";
  c.textAlign = "center";
  c.fillStyle = INK;
  const name = (badge.name || "").toUpperCase();
  fitFont(c, name, 400, DISPLAY, W - 90, 68, 28);
  c.fillText(name, W / 2, H - 92);
  c.strokeStyle = INK;
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(60, H - 62);
  c.lineTo(W / 2 - 150, H - 62);
  c.moveTo(W / 2 + 150, H - 62);
  c.lineTo(W - 60, H - 62);
  c.stroke();
  fitFont(c, badge.role || "", 600, BODY, 300, 18, 11);
  c.fillText(badge.role || "", W / 2, H - 56);
  c.restore();
}

function ribbonTexture(text) {
  const H = 512;
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = H;
  const g = c.getContext("2d");
  const grad = g.createLinearGradient(0, 0, 128, 0);
  grad.addColorStop(0, "#0a0a0c");
  grad.addColorStop(0.5, "#1c1c22");
  grad.addColorStop(1, "#0a0a0c");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, H);
  // woven texture
  g.fillStyle = "rgba(255,255,255,0.035)";
  for (let y = 0; y < H; y += 4) g.fillRect(0, y, 128, 1);
  g.fillStyle = "rgba(255,255,255,0.2)";
  g.fillRect(8, 0, 2, H);
  g.fillRect(118, 0, 2, H);
  g.save();
  g.translate(64, H);
  g.rotate(-Math.PI / 2);
  g.fillStyle = "#ffffff";
  g.textBaseline = "middle";
  g.textAlign = "center";
  const label = (text || "") + "   •";
  fitFont(g, label, 800, BODY, H - 50, 54, 20);
  g.fillText(label, H / 2, 0);
  g.restore();
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function Badge3D() {
  const mountRef = useRef(null);
  const apiRef = useRef({});
  const [fallback, setFallback] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
    } catch (e) {
      setFallback(true);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "badge3d-canvas";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 11);

    scene.add(new THREE.AmbientLight(0xffffff, 1.35));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0xa78bfa, 14, 14);
    rim.position.set(-3, 1, 3);
    scene.add(rim);

    // ---- textures
    const frontCanvas = document.createElement("canvas");
    frontCanvas.width = 640;
    frontCanvas.height = 920;
    const backCanvas = document.createElement("canvas");
    backCanvas.width = 640;
    backCanvas.height = 920;
    const frontTex = new THREE.CanvasTexture(frontCanvas);
    const backTex = new THREE.CanvasTexture(backCanvas);
    [frontTex, backTex].forEach(t => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
    drawFront(frontCanvas, null);
    drawBack(backCanvas, null);
    frontTex.needsUpdate = true;
    backTex.needsUpdate = true;

    // redraw once webfont is ready, and when a photo / QR is available
    let photoImg = null;
    let qrCanvas = null;
    const redraw = () => {
      drawFront(frontCanvas, photoImg);
      drawBack(backCanvas, qrCanvas);
      frontTex.needsUpdate = true;
      backTex.needsUpdate = true;
    };
    if (document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load("400 80px Anton"),
        document.fonts.load("600 20px Inter")
      ])
        .catch(() => {})
        .then(() => document.fonts.ready)
        .then(redraw);
    }
    if (badge.photo) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        photoImg = img;
        redraw();
      };
      img.src = badge.photo;
    }
    const qc = document.createElement("canvas");
    QRCode.toCanvas(
      qc,
      badge.qrUrl || "https://shehank98.github.io",
      {margin: 0, width: 330, color: {dark: "#16130f", light: "#ebe3c8"}},
      err => {
        if (!err) {
          qrCanvas = qc;
          redraw();
        }
      }
    );

    // ---- card
    const card = new THREE.Group();
    const bodyShape = new THREE.Shape();
    const hw = CARD_W / 2;
    const hh = CARD_H / 2;
    const rr = 0.16;
    bodyShape.moveTo(-hw + rr, -hh);
    bodyShape.lineTo(hw - rr, -hh);
    bodyShape.quadraticCurveTo(hw, -hh, hw, -hh + rr);
    bodyShape.lineTo(hw, hh - rr);
    bodyShape.quadraticCurveTo(hw, hh, hw - rr, hh);
    bodyShape.lineTo(-hw + rr, hh);
    bodyShape.quadraticCurveTo(-hw, hh, -hw, hh - rr);
    bodyShape.lineTo(-hw, -hh + rr);
    bodyShape.quadraticCurveTo(-hw, -hh, -hw + rr, -hh);
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, {
      depth: CARD_D,
      bevelEnabled: false
    });
    bodyGeo.translate(0, 0, -CARD_D / 2);
    const body = new THREE.Mesh(
      bodyGeo,
      new THREE.MeshStandardMaterial({color: 0x121014, roughness: 0.45, metalness: 0.35})
    );
    card.add(body);

    const faceGeo = new THREE.PlaneGeometry(CARD_W, CARD_H);
    const front = new THREE.Mesh(
      faceGeo,
      new THREE.MeshStandardMaterial({
        map: frontTex,
        transparent: true,
        alphaTest: 0.5,
        roughness: 0.35,
        metalness: 0.15
      })
    );
    front.position.z = CARD_D / 2 + 0.001;
    const back = new THREE.Mesh(
      faceGeo,
      new THREE.MeshStandardMaterial({
        map: backTex,
        transparent: true,
        alphaTest: 0.5,
        roughness: 0.45,
        metalness: 0.05
      })
    );
    back.position.z = -CARD_D / 2 - 0.001;
    back.rotation.y = Math.PI;
    card.add(front, back);

    // metal clip
    const clip = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.2, 0.09),
      new THREE.MeshStandardMaterial({color: 0xcbd5e1, metalness: 1, roughness: 0.25})
    );
    clip.position.set(0, hh + 0.12, 0);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.1, 0.022, 12, 24),
      new THREE.MeshStandardMaterial({color: 0xe2e8f0, metalness: 1, roughness: 0.2})
    );
    ring.position.set(0, hh + 0.3, 0);
    card.add(clip, ring);

    // pivot: the card hangs from its clip ring
    const pivot = new THREE.Group();
    card.position.set(0, -(hh + 0.3), 0);
    pivot.add(card);
    scene.add(pivot);

    // ---- lanyard ribbon
    const ribbonTex = ribbonTexture(badge.lanyardText || badge.name);
    const RIBBON_STEPS = SEGMENTS * 10;
    const ribbonGeo = new THREE.BufferGeometry();
    const pos = new Float32Array((RIBBON_STEPS + 1) * 2 * 3);
    const uv = new Float32Array((RIBBON_STEPS + 1) * 2 * 2);
    const idx = [];
    for (let i = 0; i <= RIBBON_STEPS; i++) {
      const v = i / RIBBON_STEPS;
      uv.set([0, v * 2.4, 1, v * 2.4], i * 4);
      if (i < RIBBON_STEPS) {
        const a = i * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    ribbonGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    ribbonGeo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    ribbonGeo.setIndex(idx);
    const ribbonMat = new THREE.MeshStandardMaterial({
      map: ribbonTex,
      side: THREE.DoubleSide,
      roughness: 0.7
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.frustumCulled = false;
    scene.add(ribbon);

    // ---- rope physics (verlet)
    let topY = 3.2;
    const nodes = [];
    const resetRope = () => {
      nodes.length = 0;
      for (let i = 0; i <= SEGMENTS; i++) {
        // start curled up high and to the right so the badge "drops in"
        const p = new THREE.Vector3(0.25 + i * 0.12, topY + 0.6 - i * 0.04, 0);
        nodes.push({p, o: p.clone(), pinned: i === 0});
      }
      nodes[0].p.set(0, topY, 0);
      nodes[0].o.copy(nodes[0].p);
    };

    let rotY = 0.9;
    let spin = 0;
    let flipTarget = 0; // multiples of PI
    let dragging = false;
    const dragPoint = new THREE.Vector3();
    const dragOffset = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let lastClientX = 0;
    let lastTap = 0;
    let flippedThisPress = false;
    let visible = true;

    const resize = () => {
      const w = mount.clientWidth || 300;
      const h = mount.clientHeight || 500;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the whole rope+card in view regardless of aspect ratio
      const needH = 4.95;
      const needW = 3.0;
      const fovV = (camera.fov * Math.PI) / 180;
      const distH = needH / 2 / Math.tan(fovV / 2);
      const distW = needW / 2 / (Math.tan(fovV / 2) * camera.aspect);
      camera.position.z = Math.max(distH, distW);
      camera.updateProjectionMatrix();
      const visH = 2 * Math.tan(fovV / 2) * camera.position.z;
      topY = visH / 2 + 0.9;
      if (!nodes.length) resetRope();
      nodes[0].p.set(0, topY, 0);
      nodes[0].o.copy(nodes[0].p);
    };
    resize();
    resetRope();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const toWorld = e => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(ndc, camera);
      const t = -raycaster.ray.origin.z / raycaster.ray.direction.z;
      return raycaster.ray.origin.clone().addScaledVector(raycaster.ray.direction, t);
    };

    const onDown = e => {
      if (e.button > 0) return;
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObject(card, true);
      if (!hit.length) return;
      const nowT = performance.now();
      flippedThisPress = false;
      if (nowT - lastTap < 380) {
        flip();
        flippedThisPress = true;
        lastTap = 0;
      } else {
        lastTap = nowT;
      }
      dragging = true;
      lastClientX = e.clientX;
      const w = toWorld(e);
      dragOffset.copy(nodes[SEGMENTS].p).sub(w);
      dragOffset.z = 0;
      document.body.style.cursor = "grabbing";
      e.preventDefault();
      setHint(false);
    };
    const onMove = e => {
      if (!dragging) {
        const rect = renderer.domElement.getBoundingClientRect();
        ndc.set(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        raycaster.setFromCamera(ndc, camera);
        document.body.style.cursor = raycaster.intersectObject(card, true).length
          ? "grab"
          : "";
        return;
      }
      dragPoint.copy(toWorld(e)).add(dragOffset);
      spin += (e.clientX - lastClientX) * 0.0035;
      lastClientX = e.clientX;
    };
    const onUp = e => {
      if (!dragging) return;
      dragging = false;
      document.body.style.cursor = "";
      if (!flippedThisPress) flipTarget = Math.round((rotY + spin * 8) / Math.PI) * Math.PI;
    };
    const flip = () => {
      flipTarget = Math.round(rotY / Math.PI) * Math.PI + Math.PI;
      spin += 0.1;
      setHint(false);
    };
    // Listen on window: the (wider) canvas has pointer-events:none on desktop so it
    // never blocks the hero buttons; we only react when the pointer is over the card.
    const el = window;
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    apiRef.current.flip = flip;

    const io = new IntersectionObserver(
      entries => {
        visible = entries[0].isIntersecting;
      },
      {threshold: 0}
    );
    io.observe(mount);

    // ---- loop
    const GRAV = -0.0105;
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    const tmp = new THREE.Vector3();
    const DT = 1000 / 60;
    let acc = 0;
    let lastT = performance.now();

    // one fixed 60Hz physics step (frame-rate independent)
    const step = () => {
      // integrate
      for (let i = 1; i <= SEGMENTS; i++) {
        const n = nodes[i];
        const vx = (n.p.x - n.o.x) * 0.978;
        const vy = (n.p.y - n.o.y) * 0.978;
        n.o.copy(n.p);
        n.p.x += vx;
        n.p.y += vy + GRAV * (i === SEGMENTS ? 2.2 : 1); // heavy card end
      }
      // drag pulls the card end
      if (dragging) {
        const end = nodes[SEGMENTS];
        end.p.x += (dragPoint.x - end.p.x) * 0.35;
        end.p.y += (dragPoint.y - end.p.y) * 0.35;
      }
      // constraints
      for (let it = 0; it < 14; it++) {
        for (let i = 0; i < SEGMENTS; i++) {
          const a = nodes[i];
          const b = nodes[i + 1];
          tmp.copy(b.p).sub(a.p);
          const d = tmp.length() || 1e-6;
          const diff = (d - SEG_LEN) / d;
          if (a.pinned) {
            b.p.addScaledVector(tmp, -diff);
          } else {
            a.p.addScaledVector(tmp, diff * 0.5);
            b.p.addScaledVector(tmp, -diff * 0.5);
          }
        }
        nodes[0].p.set(0, topY, 0);
      }

      // spin / flip: spring toward the target face while free, direct while dragging
      if (dragging) {
        spin *= 0.8;
      } else {
        spin += (flipTarget - rotY) * 0.018;
        spin *= 0.9;
      }
      rotY += spin;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      acc += Math.min(now - lastT, 250);
      lastT = now;
      if (!visible) {
        acc = 0;
        return;
      }
      let n = 0;
      while (acc >= DT && n < 8) {
        step();
        acc -= DT;
        n++;
      }
      if (n === 8) acc = 0;

      const a = nodes[SEGMENTS - 1].p;
      const b = nodes[SEGMENTS].p;
      const ang = Math.atan2(b.x - a.x, -(b.y - a.y));
      pivot.position.set(b.x, b.y, 0);
      pivot.rotation.z = ang * 0.9;
      card.rotation.y = rotY + (reduce ? 0 : Math.sin(now / 900) * 0.04);

      // lanyard ribbon through the nodes
      const pts = nodes.map(n => new THREE.Vector3(n.p.x, n.p.y, 0));
      // extend to the clip ring
      pts[SEGMENTS] = new THREE.Vector3(b.x, b.y, 0);
      const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.4);
      const p = ribbonGeo.attributes.position.array;
      const half = 0.17;
      for (let i = 0; i <= RIBBON_STEPS; i++) {
        const t = i / RIBBON_STEPS;
        const c = curve.getPoint(t);
        const tg = curve.getTangent(t);
        // perpendicular in the screen plane, slightly twisted
        const nx = -tg.y;
        const ny = tg.x;
        p[i * 6] = c.x + nx * half;
        p[i * 6 + 1] = c.y + ny * half;
        p[i * 6 + 2] = 0;
        p[i * 6 + 3] = c.x - nx * half;
        p[i * 6 + 4] = c.y - ny * half;
        p[i * 6 + 5] = 0;
      }
      ribbonGeo.attributes.position.needsUpdate = true;
      ribbonGeo.computeVertexNormals();

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (o.material.map) o.material.map.dispose();
          o.material.dispose();
        }
      });
      document.body.style.cursor = "";
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  if (fallback) {
    return (
      <div className="badge3d badge3d-static">
        <div className="static-card">
          <span className="static-company">{badge.company}</span>
          <strong>{badge.name}</strong>
          <em>{badge.role}</em>
        </div>
      </div>
    );
  }

  return (
    <div className="badge3d">
      <div className="badge3d-mount" ref={mountRef} />
      <div className={`badge3d-hint ${hint ? "show" : ""}`}>
        Drag me · double-tap to flip
      </div>
      <button
        type="button"
        className="badge3d-flip"
        onClick={() => apiRef.current.flip && apiRef.current.flip()}
        aria-label="Flip the ID badge"
      >
        <i className="fas fa-sync-alt" /> Flip
      </button>
    </div>
  );
}
