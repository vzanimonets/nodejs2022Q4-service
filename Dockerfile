FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --only=development

COPY . .