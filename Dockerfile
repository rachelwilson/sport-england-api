FROM node:8.9.4-alpine

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .
