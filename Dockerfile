FROM node:alpine

COPY . /app
WORKDIR /app
RUN npm install --prod

ENTRYPOINT ["npm", "run", "server"]
