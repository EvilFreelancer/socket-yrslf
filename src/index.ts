import Discord from "discord.js";
import Twitch from "tmi.js";
import { forkJoin } from "rxjs";
import { map, throwIfEmpty } from "rxjs/operators";
import { twitchClientConfig, twitchConfig, discordConfig } from "./config";
import { createDiscordMessageStream } from "./createDiscordMessageStream";
import { createTitchMessageStream } from "./createTitchMessageStream";

const discord = new Discord.Client();
const twitch = new Twitch.client(twitchClientConfig);

const discordMsg$ = createDiscordMessageStream(
  discord,
  discordConfig,
  twitchConfig
);
const twitchMsg$ = createTitchMessageStream(twitch);

forkJoin(twitch.connect(), discord.login(discordConfig.token))
  .pipe(
    map(
      () => discord.channels.get(discordConfig.channelId) as Discord.TextChannel
    ),
    throwIfEmpty(() => new Error("Channel not found"))
  )
  .subscribe(channel => {
    console.log("Connected");

    twitchMsg$.subscribe(message => channel.send(message));
    discordMsg$.subscribe(message => twitch.say(twitchConfig.channel, message));
  });
