import Youtube from 'ymi.js';
import {Subject} from "rxjs";
import {map, filter} from "rxjs/operators";
import {YoutubeMessage} from "../messages/YoutubeMessage";

const youtubeMsg$ = new Subject<YoutubeMessage>();

/**
 * Return stream with messages from YouTube
 *
 * @param youtube
 */
export const youtubeStream = (youtube) => {

  // On each chat message from Discord
  youtube.on('chat', (user, message) => {
    console.log(user, message);
    youtubeMsg$.next(message)
  });

  // // Return stream with messages from Discord
  // return youtubeMsg$.pipe(
  //   filter(({author}) => !author.bot),
  //   map(({user, message}) => {
  //     return `[Discord] ${user.displayName}: ${message.displayMessage}`;
  //   })
  // );

};
