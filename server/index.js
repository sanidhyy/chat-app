const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const msgRoute = require("./routes/msgRoutes");

// Initialize App with express
const app = express();
// integrate socket.io
const socket = require("socket.io");
require("dotenv").config();

// use required Routes
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", msgRoute);

// Mongodb connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Set and render server port
const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

// socket io initialize
const io = socket(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// new users map
global.onlineUsers = new Map();

// Socket IO Logic
io.on("connection", (socket) => {
  global.chatSocket = socket;
  // Add user
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  // Send message
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    // check message recieved
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
