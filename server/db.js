const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

// DATA_DIR is where the SQLite file and uploads live. On Railway this should be
// a mounted Volume path (set via env) so content survives redeploys.
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "..", "data");
fs.mkdirSync(DATA_DIR, {recursive: true});

const db = new Database(path.join(DATA_DIR, "portfolio.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    section TEXT PRIMARY KEY,
    data    TEXT NOT NULL,
    updated INTEGER NOT NULL
  );
`);

const getStmt = db.prepare("SELECT data FROM content WHERE section = ?");
const allStmt = db.prepare("SELECT section, data FROM content");
const upsertStmt = db.prepare(`
  INSERT INTO content (section, data, updated) VALUES (?, ?, ?)
  ON CONFLICT(section) DO UPDATE SET data = excluded.data, updated = excluded.updated
`);
const delStmt = db.prepare("DELETE FROM content WHERE section = ?");

function getSection(section) {
  const row = getStmt.get(section);
  return row ? JSON.parse(row.data) : undefined;
}

function getAllSections() {
  const out = {};
  for (const row of allStmt.all()) {
    try {
      out[row.section] = JSON.parse(row.data);
    } catch (_) {
      // Skip corrupt rows rather than crash the whole API.
    }
  }
  return out;
}

function setSection(section, data) {
  upsertStmt.run(section, JSON.stringify(data), Date.now());
}

function deleteSection(section) {
  delStmt.run(section);
}

module.exports = {DATA_DIR, getSection, getAllSections, setSection, deleteSection};
