import * as dotenv from 'dotenv';

const res = dotenv.config();

export default {
    port: parseInt(process.env.PORT!),
    host: process.env.HOST!,
    dbUri: process.env.DB_URI!,
    saltWorkFactor: parseInt(process.env.SALT_WORKER_FACTOR!),
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
    privateKey: process.env.PRIVATE_KEY!,
    publicKey: process.env.PUBLIC_KEY!,
    MQTT_BROKER_URL: process.env.MQTT_BROKER_URL!,
    MQTT_USERNAME:  process.env.MQTT_USERNAME,
    MQTT_PASSWORD: process.env.MQTT_PASSWORD
};