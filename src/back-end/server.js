const { Socket } = require('dgram')
const express = require('express')
const app = express() // for routing 
const server = require('http').Server(app)
const io = require('socket.io')(server) // socket.io should be provided with the port on which the socket is going to be established
/*
socket.io (on top of TCP)
real-time, bidirectional and event-based and low-latency channel communication between the browser and the server
try to establish a WebSocket connection if possible, and will fall back on HTTP long polling if not
most browsers support websockets 
*/

const { v4: uuidV4 } = require('uuid') // uuid ; A universally unique identifier (for each room)

app.set('view-engine', 'ejs') // using ejs as the view engine
app.use(express.static('public')) // serve static files
