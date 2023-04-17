# Snappy - A React JS Chat Application


![CHAT APPLICATION WITH REACT JS](https://user-images.githubusercontent.com/71302066/173859274-3176af8c-0819-4a14-9746-a6f85ba12db5.png)

[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/Technical-Shubham-tech)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Technical-Shubham-tech/chat-app/commits/main)
[![GitHub license](https://img.shields.io/github/license/Technical-Shubham-tech/chat-app)](https://github.com/Technical-Shubham-tech/chat-app/blob/main/LICENSE.md)
[![GitHub branches](https://badgen.net/github/branches/Technical-Shubham-tech/chat-app/)](https://github.com/Technical-Shubham-tech/chat-app/branches)
[![Github commits](https://badgen.net/github/commits/Technical-Shubham-tech/chat-app/main)](https://github.com/Technical-Shubham-tech/chat-app/commits/)
[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://snappy-chatapp.netlify.app/)
[![GitHub issues](https://img.shields.io/github/issues/Technical-Shubham-tech/chat-app)](https://github.com/Technical-Shubham-tech/chat-app/issues)

## ⚠️ Before you start
1. Make sure **Git** and **NodeJS** is installed
2. **Yarn** is faster than Npm. So use [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/).
3. Create .env file in both public and server folder.
4. _server/.env_
```
PORT=5000
MONGO_URL=xxxxxxxxxxxxxx
MESSAGE_ALGORITHM="aes-256-ctr"

MESSAGE_SECRET_KEY="xxxxxxxxxxxxxxxxxx"
CLIENT_URL="http://localhost:3000"
```
5. _public/.env_
```
REACT_APP_CHAT_APP_USER="xxxxxxxxxxxxxxxxxxxxxx"
REACT_APP_MULTIAVATAR_API_KEY="xxxxxxxxxxxxxxxxx"
REACT_APP_SERVER_URI="http://localhost:5000"
```

6. In most cases localhost is set to port 3000 and 5000 in client and server side respectively. But if there is any issue in connection you can change these values.
7. Make sure Mango Db and Mongo Db Compass is installed on your local system. If it's not, you can follow [this](https://www.mongodb.com/docs/manual/tutorial/) guide.
8. Now copy your mongo db url as shown below:

![Copy mongo db url](https://user-images.githubusercontent.com/71302066/173810573-e01250c2-8929-46dc-8adb-3fcd6f16e59c.png))

*NOTE:* Both `MESSAGE_SECRET_KEY` and `REACT_APP_CHAT_APP_USER` are just different random strings. You can generate them using a [password generator](https://passwordsgenerator.net/). Make sure their length is of decent amount like 16 or 32.

9. To setup Avatar, Create an account in [Multiavatar API](https://multiavatar.com)
10. On app dashboard, copy your key as shown below and paste them in .env file in public folder.
![copy api key](https://user-images.githubusercontent.com/71302066/173812498-cbbd0dca-4cfc-494f-9aee-f3acfdb5e339.png)
**NOTE:** You can use Multiavatar API without account but API requests are limited to 10/min that's why, I didn't recommend doing it in that way.
Make sure you don't share them publicly.

## 📌 How to use this App?
1. Clone this **repository** to your local computer.
2. Open **terminal** in root directory and `cd server`
3. Type and Run `yarn install`
4. Run `yarn start` to start back end server
5. Now, check console. If it says, _Server is running!_ and _Database connection successfull_. Then it means that everything is working fine!
![console.log output](https://user-images.githubusercontent.com/71302066/173813948-8dfe60a2-5a26-4174-987e-bb8e6f6c2c02.png)

6. Now, nodejs server is **configured** and started. Next, we need to setup **Client** side server.
7. Open a new **Terminal** and run `yarn install`. Make sure you are in `public` folder.
8. Once packages are installed, type and run `yarn start`
9. Now client side server will be started and you can start using this app :+1:

![Authentication Page](https://user-images.githubusercontent.com/71302066/173814643-c1e05a3c-7089-4e79-b1b2-25ddf987cb8b.png)

## 📃 Built with
[<img src="https://media3.giphy.com/media/ln7z2eWriiQAllfVcn/200w.webp" width="100">](https://www.javascript.com/)
[<img src="https://i.giphy.com/media/eNAsjO55tPbgaor7ma/200w.webp" width="100">](https://reactjs.org/)
[<img src="https://media3.giphy.com/media/kdFc8fubgS31b8DsVu/giphy.webp" width="100">](https://nodejs.org/)
<br /><br />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" width="200" />

## 🔧 Stats

![Stats for this App](https://user-images.githubusercontent.com/71302066/173817276-26d0d2ea-c47a-4e57-b267-16436150749d.svg)

## 🙌🏼 Contribute
This app is currently not mobile responsive. Only responsive upto Tablet devices. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## Buy Me a Coffee 🍺

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

## 🚀 Follow Me
[![GitHub followers](https://img.shields.io/github/followers/Technical-Shubham-tech?style=social&label=Follow&maxAge=2592000)](https://github.com/Technical-Shubham-tech)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FTechnicalShubam)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FTechnical-Shubham-tech%2Fmedical-chat-app)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCNAz_hUVBG2ZUN8TVm0bmYw)
