require("dotenv").config();
const {env} = process;

/**
 * Discord settings
 */
export const discordConfig = {
  channelId: env.DISCORD_CHANNEL_ID || "",
  token:     env.DISCORD_TOKEN || "",
  userId:    env.DISCORD_USER_ID || "",
  hookUrl:   env.DISCORD_HOOK_URL || "",
};

/**
 * YouTube settings
 */
export const youtubeConfig = {
  APIKey:    env.YOUTUBE_API_KEY || "",
  ChannelID: env.YOUTUBE_CHANNEL_ID || "",
  Delay: Number(env.YOUTUBE_CHANNEL_ID)|| 5000,
};

/**
 * Twitch settings
 */
export const twitchConfig = {
  username: env.TWITCH_USERNAME || "",
  token:    env.TWITCH_TOKEN || "",
  channel:  env.TWITCH_CHANNEL || "",
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
