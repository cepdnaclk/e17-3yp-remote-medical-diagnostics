import { Request, Response } from 'express';
import refreshTokenModel from "../model/refreshToken.model";
import { v4 as uuidV4 } from 'uuid'; // uuid ; A universally unique identifier (for each room)


async function generateRoom(req: Request, res: Response) {
    const refreshToken: string = req.body.refreshToken
    try {
        // check the validity of the refresh token
        const isValid: Boolean = await refreshTokenModel.isRefreshTokenValid(refreshToken)
        if (!isValid) return res.sendStatus(403)
        res.redirect(`/${uuidV4()}`)
    } catch (error) {
        return res.sendStatus(403)
    }

}


export default generateRoom;
