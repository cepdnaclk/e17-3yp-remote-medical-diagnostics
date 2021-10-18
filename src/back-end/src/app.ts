import express from 'express';
import Config from "./config/default"
import log from './logger';
import connect from './db/connect';
import routes from './routes/routes';
import createSocketServer from './chat/socketCommunication';

const { port, host } = Config

async function main() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // connect to the database before starting the webserver
    await connect()
    routes(app);
    return app
}

// Used to stop listening to a port when tests are running
if (require.main === module) {
    main().then(app => {
        const server = app.listen(port, host);
        createSocketServer(server);
        log.info(`server listening at port ${port} of host ${host}`)
        console.log(`server listening at port ${port} of host ${host}`)
    }).catch((error: any) => {
        log.debug(error);
    })
}


export default main