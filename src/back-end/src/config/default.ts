
import * as dotenv from 'dotenv';

dotenv.config();
export default {
    port: process.env.PORT,
    host: process.env.HOST,
    dbUri: process.env.DB_URI,
    saltWorkFactor: process.env.SALT_WORKER_FACTOR,
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY
};