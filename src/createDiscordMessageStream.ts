import Discord from "discord.js";
import { Subject } from "rxjs";
import { map, filter } from "rxjs/operators";

const discordMsg$ = new Subject<Discord.Message>();

export const createDiscordMessageStream = (
  discord,
  discordConfig,
  twitchConfig
) => {
  discord.on("message", discordMsg$.next.bind(discordMsg$));

  return discordMsg$.pipe(
    filter(
      ({ channel, author }) =>
        channel.id == discordConfig.channelId &&
        author.id != discordConfig.userId
    ),
    map(({ author, content }) => {
      const prefix =
        author.username === twitchConfig.king ? "PurpleStar" : "KAPOW";

      return `${prefix} ${author.username}: ${content}`;
    })
  );
};
