/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URI: string;
  readonly VITE_CHAT_APP_USER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "react-toastify";
declare module "react-toastify/dist/ReactToastify.css";
