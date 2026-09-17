import http from "node:http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import msgRoute from "./routes/msgRoutes.js";
import { requireEnv } from "./env.js";

dotenv.config();

const app = express();
const onlineUsers = new Map<string, string>();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", msgRoute);

mongoose
  .connect(requireEnv("MONGO_URL"))
  .then(() => {
    console.log("Db Connection Successful");
  })
  .catch((err: Error) => {
    console.log(err.message);
  });

const httpServer = http.createServer(app);
const port = requireEnv("PORT");

httpServer.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = new Server(httpServer, {
  cors: {
    origin: requireEnv("CLIENT_URL"),
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("add-user", (userId: string) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data: { to: string; from: string; message: string }) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
