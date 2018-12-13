import { Subject } from "rxjs";
import { map, filter } from "rxjs/operators";
import { ITwitchMessage } from "./ITwitchMessage";

const twitchMsg$ = new Subject<ITwitchMessage>();

export const createTitchMessageStream = twitch => {
  twitch.on("chat", (channel, userState, message, isSelf) =>
    twitchMsg$.next({ channel, userState, message, isSelf })
  );

  return twitchMsg$.pipe(
    filter(({ isSelf }) => !isSelf),
    map(
      ({ userState, message }) => `\`${userState["display-name"]}:\` ${message}`
    )
  );
};
