// Main libraries
import Discord from "discord.js";
import Twitch from "tmi.js";
import YouTube from 'youtube-chill';

// Additional libraries
import request from "request";
import {forkJoin} from "rxjs";
import {map, throwIfEmpty} from "rxjs/operators";

// Read configs and other important stuff
import {twitchClientConfig, twitchConfig, discordConfig, youtubeConfig} from "./config";
import {discordStream} from "./streams/DiscordStream";
import {twitchStream} from "./streams/TwitchStream";
// import {youtubeStream} from "./streams/YoutubeStream";

// Start clients
const discord = new Discord.Client();
const twitch  = new Twitch.Client(twitchClientConfig);
const youtube = new YouTube(youtubeConfig);

console.log(youtube);

// Stream logic of clients
const discordMsg$ = discordStream(discord, discordConfig);
const twitchMsg$  = twitchStream(twitch);
// const youtubeMsg$ = youtubeStream(youtube);

youtube.connect();

// On each chat message from Discord
youtube.on('message', (message) => {
  console.log(message);
});

// forkJoin(
//   // twitch.connect(),
//   youtube.connect(),
//   // discord.login(discordConfig.token)
// )
//   .pipe(
//     map(() => discord.channels.get(discordConfig.channelId) as Discord.TextChannel),
//     throwIfEmpty(() => new Error("Channel not found"))
//   )
//   .subscribe(() => {
//     //console.log(`Connected to Discord channel ${discordChannel.id}`);
//
//     // On each chat message from Discord
//     youtube.on('message', (message) => {
//       console.log(message);
//     });
//
//     // Messages from YouTube should be sent to Discord and Twitch
//
//     // // Messages from Twitch should be sent to Discord and YouTube
//     // twitchMsg$.subscribe(({message, username, avatar}) => {
//     //   console.log(`[Twitch] ${username}: ${message}`);
//     //
//     //   // Message to Discord
//     //   request({
//     //     url:    discordConfig.hookUrl,
//     //     method: "POST",
//     //     json:   {
//     //       content:    message,
//     //       username:   '[Twitch] ' + username,
//     //       avatar_url: avatar
//     //     }
//     //   });
//     //
//     //   // Message to YouTube
//     //   //youtube.send(`[Twitch] ${username}: ${message}`);
//     //
//     // });
//     //
//     // // Messages from Discord should be sent to Twitch and YouTube
//     // discordMsg$.subscribe((message) => {
//     //   console.log(message);
//     //
//     //   // Message to Twitch
//     //   twitch.say(twitchConfig.channel, message);
//     //
//     //   // Message to YouTube
//     //   //youtube.send(message);
//     //
//     // });
//
//   });
