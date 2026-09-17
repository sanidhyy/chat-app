import type { User } from "../types";

export const getStoredUser = (): User | null => {
  const raw = localStorage.getItem(import.meta.env.VITE_CHAT_APP_USER);
  if (!raw) return null;
  return JSON.parse(raw) as User;
};

export const setStoredUser = (user: User) => {
  localStorage.setItem(import.meta.env.VITE_CHAT_APP_USER, JSON.stringify(user));
};
