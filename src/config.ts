require("dotenv").config();

const {
        YOUTUBE_LIVECHAT_ID   = "",
        YOUTUBE_CLIENT_ID     = "",
        YOUTUBE_CLIENT_SECRET = "",
        YOUTUBE_REFRESH_TOKEN = "",
        TWITCH_USERNAME       = "",
        TWITCH_TOKEN          = "",
        TWITCH_CHANNEL        = "",
        DISCORD_CHANNEL_ID    = "",
        DISCORD_TOKEN         = "",
        DISCORD_USER_ID       = "",
        DISCORD_HOOK_URL      = ""
      } = process.env;

export const youtubeConfig = {
  liveChatID: YOUTUBE_LIVECHAT_ID, // ID of the LiveChat
  // OAuth2 keys from Google Developers Console
  oauth:      {
    client_id:     YOUTUBE_CLIENT_ID,
    client_secret: YOUTUBE_CLIENT_SECRET,
    refresh_token: YOUTUBE_REFRESH_TOKEN,
  },
};

export const twitchConfig = {
  username:  TWITCH_USERNAME,
  token:     TWITCH_TOKEN,
  channel:   TWITCH_CHANNEL,
};

export const discordConfig = {
  channelId: DISCORD_CHANNEL_ID,
  token:     DISCORD_TOKEN,
  userId:    DISCORD_USER_ID,
  hookUrl:   DISCORD_HOOK_URL
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
