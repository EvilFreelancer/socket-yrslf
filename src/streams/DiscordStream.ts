import Discord from "discord.js";
import {Subject} from "rxjs";
import {map, filter} from "rxjs/operators";

const discordMsg$ = new Subject<Discord.Message>();

/**
 * Return stream with messages from Twitch
 *
 * @param discord
 * @param discordConfig
 */
export const discordStream = (discord, discordConfig) => {

  // On each chat message from Discord
  discord.on('message', message => {
    discordMsg$.next(message)
  });

  // Return stream with messages from Discord
  return discordMsg$.pipe(
    filter(({author, channel}) => !author.bot && author.id !== discordConfig.userId && channel.id === discordConfig.channelId),
    map(({author, content}) => {
      return `[Discord] ${author.username}: ${content}`;
    })
  );

};
