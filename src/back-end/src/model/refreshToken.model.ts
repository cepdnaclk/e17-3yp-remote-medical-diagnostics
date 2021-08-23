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
    /**
     * Invalidate the refresh token 
     * @param refreshToken This refresh token will be marked as invalid
     */
    invalidate(refreshToken: String): Promise<void>;
    /**
     * Add a new refresh token to the database
     * @param refreshToken newly created refresh token
     * @param userAgent user agent (just for statistical purposes)
     */
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
    if (a.nModified !== 1)
        log.info("token invalidation failed (token doesn't exist or already invalidated)")
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