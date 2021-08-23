import express from 'express';
import Config from "./config/default"
import log from './logger';
import connect from './db/connect';
import routes from './routes/routes';

const {port, host} = Config

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to the database before starting the webserver
connect().then(()=>
app.listen(port, host, () => {
    log.info(`server listening at port ${port} of host ${host}`);

    
    routes(app);
}));