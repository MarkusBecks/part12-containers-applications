FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --only=production

COPY --chown=node:node . .

ENV REDIS_URL=redis://redis:6379
ENV MONGO_URL=mongodb://the_username:the_password@mongo:27017/the_database

USER node

CMD ["npm", "start"]
