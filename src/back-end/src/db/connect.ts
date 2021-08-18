import mongoose from 'mongoose';
import log from '../logger';
import config from 'config';

export default function connect() {
    const dbUri = config.get("dbUri") as string;

    mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            log.info("connected to database");
        })
        .catch((error) => {
            log.error("database error", error);
            process.exit(1);
        });
}