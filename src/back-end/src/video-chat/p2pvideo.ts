import cors from 'cors';
import express from 'express'
import config from '../config/default';
import http from 'http';
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

// socket.io should be provided with the port on which the socket is going to be established
/*
socket.io (on top of TCP)
real-time, bidirectional and event-based and low-latency channel communication between the browser and the server
try to establish a WebSocket connection if possible, and will fall back on HTTP long polling if not
most browsers support websockets 
*/
app.use(cors())

const port = config.socketio_port as number;
const host = config.host;

app.get('/', (req, res) => {
    res.send('Running');
});

io.on('connection', (socket) => {
    socket.emit('me', socket.id);
    console.log("me emmited " + socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded');
    })

    socket.on('callUser', ({ userToCall, signalData, from }) => {
        socket.to(userToCall).emit('callUser', { signal: signalData, from: from });
        console.log({ userToCall, from })
    })

    socket.on('answerCall', ({ signalData, to }) => {
        socket.to(to).emit('answerCall', signalData);
        console.log("callAnswered revieved and signal emitted to : " + to);
    })

});

server.listen(port, host, () => {
    console.log(`server running on port ${port} of host ${host}`)
});
