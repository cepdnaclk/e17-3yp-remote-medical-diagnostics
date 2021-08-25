import Config from "../config/default";
import { sign, verify } from 'jsonwebtoken';

type userIdentifier = {
    email: string
    type: string
}

/**
 * create an access token
 * @param param0 payload to be signed
 * @returns access token which is valid for accessTokenTtl
 */
export function createAccessToken({email, type}: userIdentifier) {
    const accessToken = sign(
        {email,type},
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
export function createRefreshToken({email,type}:userIdentifier){
    return sign(
        {email,type},
        Config.privateKey
    )
}

/**
 * Verifies the access token
 * @param token token which is from the user to be verified
 * @returns a user identifier
 * @throws error if not verified
 */
export function verifyAccessToken(token:string): userIdentifier {
    try {
        let identifier = verify(token,Config.publicKey)
        return identifier as userIdentifier
    } catch (error) {
        throw error;
    }
}

/**
 * Verifies the refresh token
 * @param token token which is from the user to be verified
 * @returns a user identifier
 * @throws error if not verified
 */
 export function verifyRefreshToken(token:string): userIdentifier {
    try {
        let identifier = verify(token,Config.privateKey)
        return identifier as userIdentifier
    } catch (error) {
        throw error;
    }
}

