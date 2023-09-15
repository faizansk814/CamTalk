# Real Talk Online Chat Platform





# RealTalk - Real Time Video Chat Application

**RealTalk is a communications platform that allows users to connect with video, audio and chat.**

**The power of collaboration is that it can turn a group of individuals into a team empowered to achieve great things
RealTalk is a type of application that enables users to share their computer screens with others in real-time over the internet. 
It includes features that allows user to chat and video call with each other.**

## Deployment Link -[https://realtalk-online-videochat.netlify.app/](https://videochatglance.netlify.app)

## Tech Stack

**Client:** HTML | CSS | Javascript | Bootsrap | External CSS library

**Server:** Node.js | Express.js | MongoDB | WebRTC | PeerJS library | Socket.io | Bcrypt | PassPort | cors | Redis | JWT |Google Auth

**github:** To maintain repository and collabration and version control.

**VS Code:** To write HTML,CSS and JavaScript code.

**Microsoft Edge,Google Chrome & Mozilla Firefox:** To check the functionality and run the code.

## Frontend Part

- Home page
- Login/Signup
- Dashboard
- Create Room
- Join Room
- Real time Message 

## Backend Part
- Authentication using JWT
- implementation using Socket.io
- fully functional Video and  Audio icons

## Database  
 - MongoDB
 - Redis

## Features 
 -  Chatting 
 -  Video Calling

 ## Application Guide to use features

### To use {Video calling} feature -->
-  First Create room 
-  User can join the call by using the room ID
-  To end the call click on hang on button

### To use {Chat} feature -->
-  First Create room
-  User can join the room using room ID after login
-  Time is displayed of message
-  Notifies User info


## Examples
 #### Creating connection and accessing user media .
```javascript 
const express = require('express');
const { client } = require('../db');
const RoomRouter = express.Router()
    RoomRouter.post("/join", async (req, res) => {
    try {
        const { roomID, type } = req.body
        let isRoomExist = await client.exists(`${roomID}`)
        console.log(isRoomExist);

        if (isRoomExist) {
            const DataBaseType = await client.get(`${roomID}`)
            console.log(DataBaseType);
            if (DataBaseType == type) {
                res.status(201).send({ "ok": true, "msg": "Room Joined Succesfully" })

            } else {
                res.send({ "ok": false, "msg": `${type} Room Doesn't Exist` });
            }
        } else {
            res.send({ "ok": false, "msg": `Room Doesn't Exist` });

        }
    } catch (error) {
        console.log(error);
        res.status(401).send({ "ok": false, "msg": error.message })

    }
})


```



