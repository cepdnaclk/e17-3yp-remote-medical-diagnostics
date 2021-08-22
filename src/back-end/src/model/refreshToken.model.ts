import mongoose from "mongoose";
import log from "../logger";

export interface refreshTokenDocument extends mongoose.Document {
    refreshToken: String;
    valid: boolean;
    userAgent: String;
    createdAt: Date;
    updatedAt: Date;
}
interface refreshTokenModel extends mongoose.Model<refreshTokenDocument>{
    invalidate(refreshToken: String): Promise<void>;
    addNewToken(refreshToken: String, userAgent:String): Promise<void>;
}

const refreshTokenSchema = new mongoose.Schema<refreshTokenDocument,refreshTokenModel>(
    {
        refreshToken: { type: String},
        valid: { type: Boolean, default: true },
        userAgent: { type: String }
    },
    { timestamps: true }
);

refreshTokenSchema.statics.invalidate = async function (refreshToken: String) {
    const a =  await this.updateOne({refreshToken: refreshToken},{valid: false}).exec()
    if (a.ok !== 1)
        log.error("Schema invalidation failed")
}

refreshTokenSchema.statics.addNewToken = async function(refreshToken: String, userAgent: String) { 
        try {
            await this.create({refreshToken, userAgent})
        } catch (error) {
            log.error("Database: add new token failed")
        }
           
}
const model= mongoose.model<refreshTokenDocument,refreshTokenModel>("refreshToken", refreshTokenSchema);

export default model;