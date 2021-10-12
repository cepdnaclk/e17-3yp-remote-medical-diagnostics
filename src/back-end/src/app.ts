import express from 'express';
import Config from "./config/default"
import log from './logger';
import connect from './db/connect';
import routes from './routes/routes';
import cors from 'cors';
import { Server } from 'socket.io'

const { port, host } = Config

async function main() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors())
    // connect to the database before starting the webserver
    await connect()
    routes(app);
    return app
}

// Used to stop listening to a port when tests are running
if (require.main === module) {
    main().then(app => {
        const server = app.listen(port, host);
        const io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
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
        log.info(`server listening at port ${port} of host ${host}`)
        console.log(`server listening at port ${port} of host ${host}`)
    }).catch((error: any) => {
        log.debug(error);
    })
}



export default main