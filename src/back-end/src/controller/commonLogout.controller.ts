import log from "../logger"
import refreshTokenModel from "../model/refreshToken.model"
import { Request, Response } from "express"


async function logoutHandler(req: Request, res: Response) {
    // make the refresh token invalid
    try {
        await refreshTokenModel.invalidate(req.body.refreshToken)
        res.sendStatus(200)
    } catch (error: any) {
        res.sendStatus(404)
        log.error(error)
    }

}

export default logoutHandler

