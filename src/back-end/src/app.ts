import express from 'express';
import Config from "./config/default"
import log from './logger';
import connect from './db/connect';
import routes from './routes/routes';

const {port, host} = Config

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
    main().then(app =>{
    app.listen(port, host)
    log.info(`server listening at port ${port} of host ${host}`)
})}



export default main