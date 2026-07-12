const fs = require("fs");
const https = require("https");
const process = require("process");
require("dotenv").config();

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;

// Write generated JSON where the app is actually served from. In a production
// container the optimized build lives in ./build; during local dev it is ./public.
const OUTPUT_DIR = fs.existsSync("./build") ? "./build" : "./public";

// Requests should never hang container startup indefinitely.
const REQUEST_TIMEOUT_MS = 15000;

function saveFile(fileName, data) {
  const target = `${OUTPUT_DIR}/${fileName}`;
  fs.writeFile(target, data, function (err) {
    if (err) return console.warn(`Could not write ${target}:`, err.message);
    console.log(`saved file to ${target}`);
  });
}

function fetchGithubProfile() {
  if (USE_GITHUB_DATA !== "true") {
    console.log("USE_GITHUB_DATA is not 'true' — skipping GitHub fetch.");
    return;
  }
  if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
    console.warn(
      "GITHUB_USERNAME or REACT_APP_GITHUB_TOKEN is missing — skipping GitHub fetch. Sections relying on GitHub data will show defaults."
    );
    return;
  }

  console.log(`Fetching profile data for ${GITHUB_USERNAME}`);
  const body = JSON.stringify({
    query: `
{
  user(login:"${GITHUB_USERNAME}") {
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
          node {
            ... on Repository {
              name
              description
              forkCount
              stargazers {
                totalCount
              }
              url
              id
              diskUsage
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
}
`
  });

  const options = {
    hostname: "api.github.com",
    path: "/graphql",
    port: 443,
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "Node"
    }
  };

  const req = https.request(options, res => {
    let data = "";
    console.log(`GitHub statusCode: ${res.statusCode}`);
    res.on("data", d => (data += d));
    res.on("end", () => {
      if (res.statusCode !== 200) {
        console.warn(
          "GitHub request did not succeed. Check REACT_APP_GITHUB_TOKEN. Sections will show defaults."
        );
        return;
      }
      saveFile("profile.json", data);
    });
  });

  req.setTimeout(REQUEST_TIMEOUT_MS, () => {
    console.warn("GitHub request timed out — skipping.");
    req.destroy();
  });
  req.on("error", error =>
    console.warn("GitHub request error — skipping:", error.message)
  );
  req.write(body);
  req.end();
}

function fetchMediumBlogs() {
  if (!MEDIUM_USERNAME) {
    console.log("MEDIUM_USERNAME is not set — skipping Medium fetch.");
    return;
  }

  console.log(`Fetching Medium blogs data for ${MEDIUM_USERNAME}`);
  const options = {
    hostname: "api.rss2json.com",
    path: `/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
    port: 443,
    method: "GET"
  };

  const req = https.request(options, res => {
    let mediumData = "";
    console.log(`Medium statusCode: ${res.statusCode}`);
    res.on("data", d => (mediumData += d));
    res.on("end", () => {
      if (res.statusCode !== 200) {
        console.warn(
          "Medium request did not succeed. Check MEDIUM_USERNAME. Blogs will show defaults."
        );
        return;
      }
      saveFile("blogs.json", mediumData);
    });
  });

  req.setTimeout(REQUEST_TIMEOUT_MS, () => {
    console.warn("Medium request timed out — skipping.");
    req.destroy();
  });
  req.on("error", error =>
    console.warn("Medium request error — skipping:", error.message)
  );
  req.end();
}

fetchGithubProfile();
fetchMediumBlogs();
