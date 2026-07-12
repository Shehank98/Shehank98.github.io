# This file is the main docker file configuration

# Official Node JS runtime as a parent image
FROM node:20.0-alpine

# Set the working directory to ./app
WORKDIR /app

RUN apk add --no-cache git

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . /app

# Create the optimized production build (served statically at runtime)
RUN npx react-scripts build

# Railway routes public traffic to this port
EXPOSE 8080

# At container start: fetch live GitHub/Medium data (so runtime env vars are
# available), then serve the optimized build. fetch.js never fails the startup —
# if data can't be fetched, sections fall back to defaults.
CMD ["sh", "-c", "node fetch.js && npx serve -s build -l ${PORT:-8080}"]
