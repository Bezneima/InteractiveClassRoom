import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';

const app = express();
app.use(cors())

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ['POST', 'GET'],
    },
});

let userClasses: Array<string> = [];

app.get('/getClass', (req, res) => {
    let nextClassId = uuidv4();
    let counter = 0;
    while (userClasses.includes(nextClassId) && counter <= 100) {
        nextClassId = uuidv4();
        counter++;
    }
    res.json({classId: nextClassId});
});

io.on("connection", (socket) => {
    let myRoomId: number;
    let myUserId: number;
    socket.on('join-room', (roomId, userId) => {
        console.log('connected');
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);
        myRoomId = roomId;
        myUserId = userId;
    });
    socket.on('disconnect', () => {
        if (myRoomId) {
            socket.to(myRoomId.toString()).emit('user-disconnected', myUserId);
        }
    })
});

httpServer.listen(3001);