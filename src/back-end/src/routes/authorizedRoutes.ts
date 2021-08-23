import { NextFunction, Request, Response, Router } from "express";
import { verifyAccessToken } from "../service/session.service";

const authRouter = Router()

authRouter.use(authenticateToken)


authRouter.get('/me',(req: Request, res: Response)=>{
    const user = res.locals.user as ReturnType<typeof verifyAccessToken>
    res.json(user)
})

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader =  req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]
    if (token==null) return res.sendStatus(401)
    try {
        const userIdentifier = verifyAccessToken(token)
        res.locals.authenticated = true
        res.locals.user = userIdentifier
        next()
    } catch (error) {
        res.sendStatus(403)
    }
}

export default authRouter