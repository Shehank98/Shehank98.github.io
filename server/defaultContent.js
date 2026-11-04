// Defaults for every admin-editable section.
//
// SINGLE SOURCE OF TRUTH: src/portfolio.js (the data the website itself is built from).
// It is read at start-up so the admin can never drift out of sync with the site
// (e.g. "8 certificates on the site but only 3 in the admin").
//
// defaultContent.static.js is only a safety net: it supplies sections / fields that
// could not be derived (and is used entirely if portfolio.js cannot be read).
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const fallback = require("./defaultContent.static");

// Turn src/portfolio.js (an ES module that require()s images) into plain JSON.
function deriveFromSite() {
  const file = path.join(__dirname, "..", "src", "portfolio.js");
  const original = fs.readFileSync(file, "utf8");
  const names = [...original.matchAll(/^const (\w+) = \{/gm)].map(m => m[1]);
  const code = original
    .replace(/import emoji from [^\n]*\n/, "const emoji = x => x;\n")
    .replace(/import splashAnimation from [^\n]*\n/, "const splashAnimation = null;\n")
    // require("./assets/images/x.png") -> "/uploads/seed/x.png" (the server seeds those files)
    .replace(/require\(\s*["']\.\/assets\/images\/([^"']+)["']\s*\)/g, (m, f) => JSON.stringify("/uploads/seed/" + f))
    .replace(/export\s*\{[\s\S]*?\};?\s*$/, "");
  const ctx = vm.createContext({});
  vm.runInContext(`${code}\n;this.__sections = { ${names.join(", ")} };`, ctx, {timeout: 2000});
  // JSON round-trip: drops functions/undefined and detaches from the VM realm
  return JSON.parse(JSON.stringify(ctx.__sections));
}

let derived = {};
try {
  derived = deriveFromSite();
} catch (err) {
  console.warn("[defaults] could not read src/portfolio.js, using built-in fallback:", err.message);
}

const out = {};
for (const key of Object.keys(fallback)) {
  // site data wins; fall back to the static copy for anything the site file lacks
  out[key] = Object.assign({}, fallback[key], derived[key] || {});
}
module.exports = out;
