export type User = {
  _id: string;
  username: string;
  email?: string;
  avatarImage: string;
  isAvatarImageSet: boolean;
};

export type ChatMessage = {
  id: string;
  fromSelf: boolean;
  message: string;
};

export type AuthResponse = {
  status: boolean;
  msg?: string;
  user?: User;
};

export type SetAvatarResponse = {
  isSet: boolean;
  image: string;
};
