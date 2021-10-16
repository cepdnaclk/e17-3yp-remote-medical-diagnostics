import { Request, Response } from 'express';
import { Server } from 'socket.io'
import http from 'http';

let socketCredentials: { [key: string]: string } = {};

interface credential {
    id: string,
    email: string,
}
export function sendSockCredentials(req: Request, res: Response) {
    res.send({ socketCredentials });
}


export default function createSocketServer(server: http.Server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket) => {
        socket.emit('me', socket.id);
        console.log("me emmited " + socket.id);

        socket.on('email', (credential: credential) => {
            if (credential.email) socketCredentials[credential.email] = credential.id;
            console.log(`id: ${credential.id} email: ${credential.email}`);
            console.log(socketCredentials);
        });

        socket.on('disconnect', () => {
            socket.emit('callEnded');
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
}