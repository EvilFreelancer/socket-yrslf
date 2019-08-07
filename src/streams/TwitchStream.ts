import {Subject} from "rxjs";
import {map, filter} from "rxjs/operators";
import {TwitchMessage} from "../messages/TwitchMessage";

const twitchMsg$ = new Subject<TwitchMessage>();

const avatarStore = new Map();

/**
 * Return user's avatar image of Twitch account
 *
 * @param client
 * @param username
 * @param oauthToken
 */
export const getAvatar = async (client, username, oauthToken) =>
  new Promise((resolve: ({avatar: string}) => void, reject) => {

    // If image in store then return this one
    if (avatarStore.has(username)) {
      return resolve(avatarStore.get(username));
    }

    // Else ask Twitch via API for these image
    client.api(
      {url: `/users/${username}?oauth_token=${oauthToken}`},
      (err, _, data: { avatar: string }) => {
        if (err) return reject(err);
        avatarStore.set(username, data);
        resolve(data);
      }
    );

  });

/**
 * Return stream with messages from Twitch
 *
 * @param twitch
 */
export const twitchStream = (twitch) => {

  // Fix OAuth2 token, it should be without "oauth:" prefix
  const oauthToken = twitch.getOptions().identity.password.replace("oauth:", "");

  // On each chat message from Twitch
  twitch.on("message", async (channel, userState, message, isSelf) => {

    // Get avatar of user from Twitch API or from local cache
    const {avatar} = await getAvatar(
      twitch,
      userState["display-name"],
      oauthToken
    );

    // Convert message to RX interface
    twitchMsg$.next({channel, userState, message, isSelf, avatar: avatar});

  });

  // Return stream with messages from Twitch
  return twitchMsg$.pipe(
    filter(({isSelf}) => !isSelf), // Exclude messages from bot
    map(({userState, message, avatar}) => ({username: userState["display-name"], message, avatar}))
  );

};
