require("dotenv").config();

/**
 * Discord settings
 */
export const discordConfig = {
  channelId: process.env.DISCORD_CHANNEL_ID || "",
  token:     process.env.DISCORD_TOKEN || "",
  userId:    process.env.DISCORD_USER_ID || "",
  hookUrl:   process.env.DISCORD_HOOK_URL || "",
};

/**
 * YouTube settings
 */
export const youtubeConfig = {
  oauth:        {
    client_id:     process.env.YOUTUBE_CLIENT_ID || "",
    client_secret: process.env.YOUTUBE_CLIENT_SECRET || "",
    access_token:  process.env.YOUTUBE_ACCESS_TOKEN || "",
    refresh_token: process.env.YOUTUBE_REFRESH_TOKEN || "",
  },
  live_chat_id: process.env.YOUTUBE_LIVECHAT_ID || "",
  page_token:   null,
};

/**
 * Twitch settings
 */
export const twitchConfig = {
  username: process.env.TWITCH_USERNAME || "",
  token:    process.env.TWITCH_TOKEN || "",
  channel:  process.env.TWITCH_CHANNEL || "",
};

export const twitchClientConfig = {
  connection: {
    reconnect: true
  },
  identity:   {
    username: twitchConfig.username,
    password: twitchConfig.token
  },
  channels:   [twitchConfig.channel]
};
