# Snappy - A React Chat Application

![CHAT APPLICATION WITH REACT JS](https://user-images.githubusercontent.com/71302066/173859274-3176af8c-0819-4a14-9746-a6f85ba12db5.png)

[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/sanidhyy)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/sanidhyy/chat-app/commits/main)
[![GitHub license](https://img.shields.io/github/license/sanidhyy/chat-app)](https://github.com/sanidhyy/chat-app/blob/main/LICENSE.md)
[![GitHub branches](https://badgen.net/github/branches/sanidhyy/chat-app/)](https://github.com/sanidhyy/chat-app/branches)
[![Github commits](https://badgen.net/github/commits/sanidhyy/chat-app/main)](https://github.com/sanidhyy/chat-app/commits/)
[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://snappy-chatapp.netlify.app/)
[![GitHub issues](https://img.shields.io/github/issues/sanidhyy/chat-app)](https://github.com/sanidhyy/chat-app/issues)

Realtime chat app with a Vite + React + TypeScript client and an Express + MongoDB + Socket.IO server. Avatars are generated locally with [Multiavatar](https://github.com/multiavatar/Multiavatar) (no API key).

## Before you start

1. Install **Git** and **Node.js 20.19 or newer**.
2. Install **[pnpm](https://pnpm.io/installation)** (this repo uses pnpm 11). Corepack is the easiest option: `corepack enable`.
3. Copy the example env files and fill in real values:

```bash
cp server/.env.example server/.env
cp public/.env.example public/.env
```

### `server/.env`

| Variable | What it is | Where to get it |
| --- | --- | --- |
| `PORT` | Port the Express API listens on. Default `5000`. | Choose any free local port. |
| `MONGO_URL` | MongoDB connection string. | **Local:** install [MongoDB](https://www.mongodb.com/docs/manual/installation/) and use `mongodb://127.0.0.1:27017/snappy`. **Atlas:** create a free cluster, then **Connect → Drivers** and copy the URI (replace `<password>` with a database user password). Compass is optional for browsing data. |
| `MESSAGE_ALGORITHM` | Cipher name passed to Node `crypto.createCipheriv`. | Keep `aes-256-ctr` unless you are starting with an empty messages collection. |
| `MESSAGE_SECRET_KEY` | 32-byte key used to encrypt chat messages at rest. | Generate with `openssl rand -hex 16` (32 hex characters). Do not reuse a short password. Changing it makes old messages unreadable. |
| `CLIENT_URL` | Browser origin allowed by Socket.IO CORS. | In development this must match the Vite URL, `http://localhost:3000`. |

### `public/.env`

Vite only exposes variables that start with `VITE_`.

| Variable | What it is | Where to get it |
| --- | --- | --- |
| `VITE_SERVER_URI` | Backend origin for REST and Socket.IO. | `http://localhost:5000` unless you changed `PORT`. |
| `VITE_CHAT_APP_USER` | `localStorage` key for the logged-in user JSON. | Any stable string, for example `chat-app-user`. This is not a third-party secret. |

Avatars no longer need an API key. The client generates SVG avatars with `@multiavatar/multiavatar`.

If the client and server cannot talk to each other, confirm `CLIENT_URL`, `VITE_SERVER_URI`, and the two ports still match.

## How to run the app

1. Clone this repository.
2. Start the API:

```bash
cd server
pnpm install
pnpm start
```

The console should print `Server started on port 5000` and `Db Connection Successful`.

![console.log output](https://user-images.githubusercontent.com/71302066/173813948-8dfe60a2-5a26-4174-987e-bb8e6f6c2c02.png)

3. In a second terminal, start the client:

```bash
cd public
pnpm install
pnpm start
```

The Vite app is served at [http://localhost:3000](http://localhost:3000).

Useful scripts in both packages:

- `pnpm lint` — ESLint
- `pnpm build` — TypeScript check plus production build (`dist/`)

![Authentication Page](https://user-images.githubusercontent.com/71302066/173814643-c1e05a3c-7089-4e79-b1b2-25ddf987cb8b.png)

### Need help?

If you run into issues during installation or setup:

- **GitHub Discussions** — [Open a Q&A discussion](https://github.com/sanidhyy/chat-app/discussions/new?category=q-a)
- **Email** — [sanidhyyy@gmail.com](mailto:sanidhyyy@gmail.com)
- **Discord** — `@sanidhyy`

## Built with

React, Vite, TypeScript, Node.js, Express, MongoDB, and Socket.IO.

<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" width="200" />

## Stats

![Stats for this App](https://user-images.githubusercontent.com/71302066/173817276-26d0d2ea-c47a-4e57-b267-16436150749d.svg)

## Contribute

The layout currently targets tablet-sized screens and up. Contributions are welcome: open a pull request and follow the [community guidelines](CODE_OF_CONDUCT.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## Buy Me a Coffee

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

## Follow Me

[![GitHub followers](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy)
[![X](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fx.com%2F_sanidhyy)](https://x.com/_sanidhyy)
