const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const {DATA_DIR, getAllSections, setSection, deleteSection} = require("./db");
const defaults = require("./defaultContent");

const app = express();
const PORT = process.env.PORT || 8080;
const BUILD_DIR = path.join(__dirname, "..", "build");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
const SEED_DIR = path.join(UPLOADS_DIR, "seed");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";
const SESSION_SECRET =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const COOKIE_NAME = "pf_admin";

if (ADMIN_PASSWORD === "changeme") {
  console.warn(
    "[admin] WARNING: ADMIN_PASSWORD is not set — using default 'changeme'. Set ADMIN_PASSWORD in Railway before going live."
  );
}

// --- Seed the bundled images into the uploads volume so existing images keep
// working and can be replaced from the admin. Runs once (skips if seed exists).
function seedImages() {
  fs.mkdirSync(SEED_DIR, {recursive: true});
  const srcDir = path.join(__dirname, "..", "src", "assets", "images");
  if (!fs.existsSync(srcDir)) return;
  for (const file of fs.readdirSync(srcDir)) {
    const dest = path.join(SEED_DIR, file);
    if (!fs.existsSync(dest)) {
      try {
        fs.copyFileSync(path.join(srcDir, file), dest);
      } catch (e) {
        console.warn(`[seed] could not copy ${file}:`, e.message);
      }
    }
  }
}
seedImages();

app.use(express.json({limit: "2mb"}));
app.use(cookieParser());

// --- Auth helpers ----------------------------------------------------------
function signToken() {
  return jwt.sign({role: "admin"}, SESSION_SECRET, {expiresIn: "7d"});
}
function requireAuth(req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return res.status(401).json({error: "Not authenticated"});
  try {
    jwt.verify(token, SESSION_SECRET);
    next();
  } catch (_) {
    res.status(401).json({error: "Session expired"});
  }
}

app.post("/api/login", (req, res) => {
  const {password} = req.body || {};
  if (typeof password !== "string" || password !== ADMIN_PASSWORD) {
    return res.status(401).json({error: "Incorrect password"});
  }
  res.cookie(COOKIE_NAME, signToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.json({ok: true});
});

app.post("/api/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ok: true});
});

app.get("/api/me", requireAuth, (req, res) => res.json({ok: true}));

// --- Public content: only sections that have been explicitly saved ---------
app.get("/api/content", (req, res) => {
  res.json(getAllSections());
});

// --- Admin: effective content (defaults overlaid with saved overrides) -----
app.get("/api/admin/content", requireAuth, (req, res) => {
  const saved = getAllSections();
  const merged = {};
  for (const key of Object.keys(defaults)) {
    merged[key] = {...defaults[key], ...(saved[key] || {})};
  }
  // Include any saved sections not present in defaults, just in case.
  for (const key of Object.keys(saved)) {
    if (!merged[key]) merged[key] = saved[key];
  }
  res.json(merged);
});

app.put("/api/admin/section/:key", requireAuth, (req, res) => {
  const {key} = req.params;
  if (!Object.prototype.hasOwnProperty.call(defaults, key)) {
    return res.status(400).json({error: `Unknown section: ${key}`});
  }
  if (typeof req.body !== "object" || req.body === null) {
    return res.status(400).json({error: "Body must be a JSON object"});
  }
  setSection(key, req.body);
  res.json({ok: true});
});

app.post("/api/admin/section/:key/reset", requireAuth, (req, res) => {
  deleteSection(req.params.key);
  res.json({ok: true});
});

// --- Uploads (images + resume PDF) -----------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(UPLOADS_DIR, {recursive: true});
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  }
});
const upload = multer({
  storage,
  limits: {fileSize: 10 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    const ok = /^(image\/|application\/pdf)/.test(file.mimetype);
    cb(ok ? null : new Error("Only images and PDF files are allowed"), ok);
  }
});

app.post("/api/admin/upload", requireAuth, (req, res) => {
  upload.single("file")(req, res, err => {
    if (err) return res.status(400).json({error: err.message});
    if (!req.file) return res.status(400).json({error: "No file uploaded"});
    res.json({url: `/uploads/${req.file.filename}`});
  });
});

// --- Static: uploads, admin UI, then the React build -----------------------
app.use("/uploads", express.static(UPLOADS_DIR));
app.get("/admin", (req, res) =>
  res.sendFile(path.join(__dirname, "admin.html"))
);
app.use(express.static(BUILD_DIR));

// SPA fallback for all other routes.
app.get("*", (req, res) => {
  res.sendFile(path.join(BUILD_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Portfolio server listening on port ${PORT}`);
  console.log(`Admin UI available at /admin`);
});
