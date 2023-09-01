FROM node:16

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
CMD ["npm", "start"]


#FROM node:16 AS build-stage

#WORKDIR /usr/src/app

#COPY . .

#RUN npm install

#CMD ["npm", "start"]

#ENV REACT_APP_BACKEND_URL=http://localhost:3001

#RUN CI=true npm test

#RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY

#FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page

#COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html