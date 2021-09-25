import { Socket } from 'dgram';
import express from 'express'
import config from 'config';
import http from 'http';
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app);
const io = new Server(server) // socket.io should be provided with the port on which the socket is going to be established
/*
socket.io (on top of TCP)
real-time, bidirectional and event-based and low-latency channel communication between the browser and the server
try to establish a WebSocket connection if possible, and will fall back on HTTP long polling if not
most browsers support websockets 
*/

require('dotenv').config();

const port = config.get("port") as number;
const host = config.get("host") as string;

app.use(express.static('public')) // serve static files

io.on('connection', (socket) => {
    socket.emit('me', socket.id);
    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded');
    })
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    })

    socket.on('answerCall', (data) => {
        io.to(data.to).emit(data.signal);
    })
});

app.listen(port, host, () => {
    console.log(`server running on port ${port} of host ${host}`)
});
