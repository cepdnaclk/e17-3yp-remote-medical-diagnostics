import { Socket } from 'dgram';
import express from 'express'
import config from 'config';
import http from 'http';
import { Server } from 'socket.io'
import { v4 as uuidV4 } from 'uuid'; // uuid ; A universally unique identifier (for each room)

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

app.set('view-engine', 'ejs') // using ejs as the view engine (to be used temporarily until intergration with React front-end)
app.use(express.static('public')) // serve static files

app.listen(port, host, () => {
    console.log(`server running on port ${port} of host ${host}`)
})