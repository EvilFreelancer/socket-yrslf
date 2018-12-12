# Twitch <-> Discord messaging

Bot created for crossplatform messaging between Twitch and Discord

## Set the parameters

You need change settings inside `.env` file to what you need. Example
of this file (`.env.example`) you can find in same folder as project.

And if settings is correct you will see messages in chats after server started.

### Available environment variables

|Environment        |Default value |
|-------------------|--------------|
|DISCORD_TOKEN      |xxxx          |
|DISCORD_CHANNEL_ID |1234          |
|DISCORD_USER_ID    |123456        |
|TWITCH_USERNAME    |MyBot         |
|TWITCH_CHANNEL     |#mychannel    |
|TWITCH_TOKEN       |oauth:xxxxxxx |
|TWITCH_KING        |TheKing       |

### How to obtain Twitch tokens, ids, etc

#### TWITCH_TOKEN

You need [generate OAuth token](https://twitchapps.com/tmi/) for your Twitch account.

Please create separated twitch account for bot if you do not wanna lose your primary account.

#### TWITCH_CHANNEL

This is the part of your channel's URL, for example in `https://www.twitch.tv/evilfreelancer`
path `evilfreelancer` is channel name. 

#### TWITCH_USERNAME

Name of your Bot user, should be the same as you used for authorization on Twitch.

#### TWITCH_KING

Username of account in Discord (for example your account), which you want to highlight.

### How to obtain Discord tokens, ids, etc

#### DISCORD_USER_ID

You need login to [Discord Developers](https://discordapp.com/developers/)
portal and create new application.

After you done need login the application to your Discord server.

#### DISCORD_TOKEN

From Bots page of Discord Developers portal you can find the token. 

`https://discordapp.com/developers/applications/{application_id}/bots`

#### DISCORD_CHANNEL_ID

Then you need enable debug mode of your Discord client, for this go to
your "User Settings", then to "Appearance" and on this page in "Advanced" block
will be a "Developer Mode", you need switch this to ON.

Then close the settings page and click MRB on any text chat room what you
want, then select "Copy ID" from list and ID and `DISCORD_CHANNEL_ID``
will saved to your clipboard. 

## How to use via NPM

    npm install
    npm run server 

## How to use via Docker

    docker pull evilfreelancer/socket-yrslf
    docker run -e DISCORD_TOKEN=xxxx -e DISCORD_CHANNEL_ID=.... ..cuted.. -d evilfreelancer/socket-yrslf

## How to use via Docker Compose

    cp docker-compose.yml.dist docker-compose.yml
    docker-compose up -d

## Get Support!

* [Discord](https://discord.gg/KzHGXKp) - Here you can talk with author of this project directly
* [GitHub Issues](https://github.com/EvilFreelancer/socket-yrslf/issues) - Got issues? Please to me!
