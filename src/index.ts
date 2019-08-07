// Main libraries
import Discord from "discord.js";
import Twitch from "tmi.js";

// Additional libraries
import request from "request";
import {forkJoin} from "rxjs";
import {map, throwIfEmpty} from "rxjs/operators";

// Read configs and other important stuff
import {twitchClientConfig, twitchConfig, discordConfig} from "./config";
import {discordStream} from "./streams/DiscordStream";
import {twitchStream} from "./streams/TwitchStream";

// Start clients
const discord = new Discord.Client();
const twitch  = new Twitch.Client(twitchClientConfig);

// Stream logic of clients
const discordMsg$ = discordStream(discord);
const twitchMsg$  = twitchStream(twitch);

forkJoin(
  twitch.connect(),
  discord.login(discordConfig.token)
)
  .pipe(
    map(() => discord.channels.get(discordConfig.channelId) as Discord.TextChannel),
    throwIfEmpty(() => new Error("Channel not found"))
  )
  .subscribe(discordChannel => {
    console.log(`Connected to Discord channel ${discordChannel.id}`);

    // Messages from YouTube should be sent to Discord and Twitch

    // Messages from Twitch should be sent to Discord and YouTube
    twitchMsg$.subscribe(({message, username, avatar}) => {
      console.log(`[Twitch] ${username}: ${message}`);

      // Message to Discord
      request({
        url: discordConfig.hookUrl,
        method: "POST",
        json: {
          content: message,
          username: `[Twitch] ${username}`,
          avatar_url: avatar
        }
      });

      // Message to YouTube
      //youtube.send(`[Twitch] ${username}: ${message}`);

    });

    // Messages from Discord should be sent to Twitch and YouTube
    discordMsg$.subscribe(message => {
      console.log(message);

      // Message to Twitch
      twitch.say(twitchConfig.channel, message);

      // Message to YouTube
      //youtube.send(message);

    });

  });
