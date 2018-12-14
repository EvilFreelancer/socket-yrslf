export interface ITwitchMessage {
  channel: string;
  userState: {
    "display-name": string;
  };
  message: string;
  isSelf: boolean;
  avatar: string;
}
