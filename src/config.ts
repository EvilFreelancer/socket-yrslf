require("dotenv").config();

const {
  TWITCH_USERNAME = "",
  TWITCH_TOKEN = "",
  TWITCH_CHANNEL = "",
  TWITCH_KING = "",
  DISCORD_CHANNEL_ID = "",
  DISCORD_TOKEN = "",
  DISCORD_USER_ID = "",
  DISCORD_HOOK_URL = ""
} = process.env;

export const twitchConfig = {
  username: TWITCH_USERNAME,
  token: TWITCH_TOKEN,
  channel: TWITCH_CHANNEL,
  king: TWITCH_KING
};

export const discordConfig = {
  channelId: DISCORD_CHANNEL_ID,
  token: DISCORD_TOKEN,
  userId: DISCORD_USER_ID,
  hookUrl: DISCORD_HOOK_URL
};

export const twitchClientConfig = {
  connection: {
    reconnect: true
  },
  identity: {
    username: twitchConfig.username,
    password: twitchConfig.token
  },
  channels: [twitchConfig.channel]
};
