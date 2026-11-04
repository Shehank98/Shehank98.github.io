# This file is the main docker file configuration

# Debian-based Node image (glibc) so better-sqlite3 installs from prebuilt
# binaries without a native toolchain.
FROM node:20-bookworm-slim

# Set the working directory to ./app
WORKDIR /app

# git is used by some build steps; build tools are a fallback for native modules.
RUN apt-get update \
  && apt-get install -y --no-install-recommends git python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# Install app dependencies first for better layer caching
COPY package.json ./

RUN npm install

# Bundle app source
COPY . /app

# Create the optimized production build (served by the Express server)
RUN npx react-scripts build

# Railway routes public traffic to this port
EXPOSE 8080

# Persist content + uploads on a Railway Volume mounted at /app/data.
ENV DATA_DIR=/app/data

# At container start: fetch live GitHub/Medium data (writes into build/), then
# run the Express server which serves the site, the /admin UI, and the content API.
CMD ["sh", "-c", "node fetch.js && node server/server.js"]
