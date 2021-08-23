import log from "../logger"
import { authResponse } from "../middleware/authenticateToken"
import refreshTokenModel from "../model/refreshToken.model"
import {Request} from "express"
import { LogoutSchema } from "../schema/logout.schema";


async function logoutHandler(req: Request, res: authResponse) {
    // get the user identifier
    const user = res.locals.user

  
    // make the refresh token invalid
    try {
        await refreshTokenModel.invalidate(req.body.refreshToken)
        res.sendStatus(200)
        log.info(`User ${user.email} logged out`)
    } catch (error) {
        res.sendStatus(404)
        log.error(error)
    }

}

export default logoutHandler

