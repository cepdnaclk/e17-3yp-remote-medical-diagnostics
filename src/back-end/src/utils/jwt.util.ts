import Config from "../config/default";
import jwt from 'jsonwebtoken';

const privateKey = Config.privateKey;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, options);
}