FROM node:alpine AS builder
COPY . /app
WORKDIR /app
RUN npm install --prod \
 && npm run production

FROM node:alpine
COPY . /app
COPY --from=builder /app/dist/ /app/dist
WORKDIR /app

ENV TWITCH_USERNAME=SocketYrslf
ENV TWITCH_CHANNEL=#mychannel
ENV TWITCH_TOKEN=oauth:xxxxxxx
ENV TWITCH_KING=TheKing

ENV DISCORD_USER_ID=123456
ENV DISCORD_CHANNEL_ID=1234
ENV DISCORD_TOKEN=xxxx
ENV DISCORD_HOOK_URL=hook_url

ENTRYPOINT ["npm", "run", "start"]
