const express = require('express');
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const httpServer = http.createServer(app);

app.use(express.json());

const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})


io.on("connection", socket => {
  console.log("Connected");
  socket.on("join-room", (roomID, userID) => {
    console.log(`${userID} Joined the Room ${roomID}`);
    console.log(roomID)
    socket.join(roomID); 
    socket.to(roomID).emit("user-join", userID);

    socket.on("disconnect", () => {
      socket.to(roomID).emit("user-disconnected", userID);
    });
  });
});

httpServer.listen(4031, () => {
  console.log("Server is running on port 4031");
});
