import { NextFunction, Request, Response, Router } from "express";
import commonLogoutHandler from "../controller/commonLogout.controller";
import authenticateToken from "../middleware/authenticateToken";
import validateRequest from '../middleware/validateRequests';
import { LogoutSchema } from "../schema/logout.schema";

const authRouter = Router()
authRouter.use(authenticateToken)


authRouter.get('/me',(req: Request, res: Response)=>{
    const user = res.locals.user
    res.json(user)
})


authRouter.post('/logout',validateRequest(LogoutSchema),commonLogoutHandler)
export default authRouter


