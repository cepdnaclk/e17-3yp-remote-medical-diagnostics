import express from 'express';
import config from 'config';
import { urlencoded } from 'body-parser';
import log from './logger';
import connect from './db/connect';
import routes from './routes';

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
    log.info(`server listening at port ${port} of host ${host}`);

    connect();
    routes(app);
});