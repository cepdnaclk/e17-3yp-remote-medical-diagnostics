import { Router } from "express";
import validateRequest from '../middleware/validateRequests';
import { LoginSchema } from "../schema/login.schema";
import { doctorLoginHandler } from "../controller/doctorLogin.controller";
import { patientLoginHandler } from "../controller/patientLogin.controller";

/**
 * Handles requests coming to /login endpoint
 * @returns a modular router for user Logins 
 */
export default function(){
    let loginRouter = Router()
    
    // validate the login request's schema
    loginRouter.use(validateRequest(LoginSchema))

    loginRouter.post('/doctor',doctorLoginHandler)
    loginRouter.post('/patient',patientLoginHandler)
    return loginRouter
}