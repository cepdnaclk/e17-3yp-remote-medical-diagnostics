import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../service/session.service";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)
    try {
        const userIdentifier = verifyAccessToken(token)
        res.locals.authenticated = true
        res.locals.accessToken = token
        res.locals.user = userIdentifier
        next()
    } catch (error) {
        res.sendStatus(403)
    }
}


export interface authResponse extends Response {
    locals: {
        authenticated: Boolean
        accessToken: String
        user: ReturnType<typeof verifyAccessToken>
    }
}
export default authenticateToken