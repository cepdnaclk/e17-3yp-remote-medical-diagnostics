import Config from "../config/default";
import { sign } from 'jsonwebtoken';

type userIdentifier = {email: string}

/**
 * create an access token
 * @param param0 payload to be signed
 * @returns access token which is valid for accessTokenTtl
 */
export function createAccessToken({email}: userIdentifier) {
    const accessToken = sign(
        {email},
        Config.publicKey,
        {expiresIn: Config.accessTokenTtl}
    );
    return accessToken;
}

/**
 * refresh token should be stored in the database. It should be removed on
 * log out event
 * @param param0 payload to be signed
 * @returns the refresh token
 */
export function createRefreshToken({email}:userIdentifier){
    return sign(
        {email},
        Config.privateKey
    )
}