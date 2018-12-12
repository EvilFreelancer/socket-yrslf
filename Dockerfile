FROM node:alpine

COPY . /app
WORKDIR /app
RUN npm install --prod
RUN npm run server
