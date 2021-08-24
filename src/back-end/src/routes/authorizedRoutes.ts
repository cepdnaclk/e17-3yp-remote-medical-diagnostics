import { NextFunction, Request, Response, Router } from "express";
import commonLogoutHandler from "../controller/commonLogout.controller";
import authenticateToken, { authResponse } from "../middleware/authenticateToken";
import validateRequest from '../middleware/validateRequests';
import { refreshTokenSchema } from "../schema/refreshToken.schema";

const authRouter = Router()
authRouter.use(authenticateToken)


authRouter.get('/me',(req: Request, res: authResponse)=>{
    const user = res.locals.user
    res.json(user)
})


authRouter.post('/logout',validateRequest(refreshTokenSchema),commonLogoutHandler)
export default authRouter


