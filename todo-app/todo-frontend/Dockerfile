FROM node:16 AS build-stage
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first for caching dependencies
COPY package*.json ./

# Install dependencies
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/
RUN npm ci

# Copy the rest of the application files
COPY . .

ENV NODE_ENV=production

RUN CI=true npm test

RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html