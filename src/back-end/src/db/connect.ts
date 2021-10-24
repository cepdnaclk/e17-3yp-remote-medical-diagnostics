import mongoose from "mongoose";
import log from "../logger";
import Config from "../config/default";

export default async function connect() {
  const dbUri = Config.dbUri as string;
  log.info("Connecting to database ...");
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    log.info("connected to database");
  } catch (error: any) {
    log.error("database error", error);
    process.exit(1);
  }
}

export async function disconnect() {
  await mongoose.connection.close();
}
