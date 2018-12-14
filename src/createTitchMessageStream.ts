import { Subject } from "rxjs";
import { map, filter } from "rxjs/operators";
import { ITwitchMessage } from "./ITwitchMessage";

const twitchMsg$ = new Subject<ITwitchMessage>();

const avatarStore = new Map();

export const getUser = async (client, username, oauthToken) =>
  new Promise((resolve: ({ logo: string }) => void, reject) => {
    if (avatarStore.has(username)) {
      return resolve(avatarStore.get(username));
    }

    client.api(
      {
        url: `/users/${username}?oauth_token=${oauthToken}`
      },
      (err, _, data: { logo: string }) => {
        if (err) return reject(err);

        avatarStore.set(username, data);
        resolve(data);
      }
    );
  });

export const createTitchMessageStream = twitch => {
  const oauthToken = twitch
    .getOptions()
    .identity.password.replace("oauth:", "");

  twitch.on("chat", async (channel, userState, message, isSelf) => {
    const { logo } = await getUser(
      twitch,
      userState["display-name"],
      oauthToken
    );

    twitchMsg$.next({ channel, userState, message, isSelf, avatar: logo });
  });

  return twitchMsg$.pipe(
    filter(({ isSelf }) => !isSelf),
    map(({ userState, message, avatar }) => ({
      username: userState["display-name"],
      message,
      avatar
    }))
  );
};
