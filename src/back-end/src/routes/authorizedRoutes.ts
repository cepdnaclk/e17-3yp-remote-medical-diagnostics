import { NextFunction, Request, Response, Router } from "express";
import authenticateToken, { authResponse } from "../middleware/authenticateToken";


const authRouter = Router()
authRouter.use(authenticateToken)


authRouter.get('/me',(req: Request, res: authResponse)=>{
    const user = res.locals.user
    res.json(user)
})


export default authRouter


