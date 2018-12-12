// Load .env file from self folder
require('dotenv').config();

const Discord = require('discord.js');
const discord = new Discord.Client();
const Twitch = require('tmi.js');
const twitch = new Twitch.client({
  connection: {
    reconnect: true
  },
  identity:   {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_TOKEN
  },
  channels:   [
    process.env.TWITCH_CHANNEL
  ]
});

/**
 * Twitch
 */

twitch.connect();

twitch.on("chat", function (channel, userstate, message, self) {
  // Don't listen to my own messages..
  if (self) return;

  // Do your stuff.
  discord.channels.get(process.env.DISCORD_CHANNEL_ID).send('`' + userstate['display-name'] + ':` ' + message);
});

/**
 * Discord
 */

// Login to account by token
discord.login(process.env.DISCORD_TOKEN);

discord.on('message', message => {
  //  if (message.author.bot) return;

  if (
    message.channel.id === process.env.DISCORD_CHANNEL_ID
    && message.author.id !== process.env.DISCORD_USER_ID
  ) {

    let prefix = 'PurpleStar';

    if (message.author.username === process.env.TWITCH_KING) {
      prefix = 'KAPOW';
    }

    twitch.say(process.env.TWITCH_CHANNEL, prefix + ' ' + message.author.username + ': ' + message);
  }
});
