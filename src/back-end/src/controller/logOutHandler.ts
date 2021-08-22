import { Router } from "express";
import validateRequest from '../middleware/validateRequests';
import { LoginSchema } from "../schema/login.schema";
import { doctorLoginHandler } from "./doctorLogin.controller";
import { patientLoginHandler } from "./patientLogin.controller";

/**
 * Handles requests coming to /login endpoint
 * @returns a modular router for user Logins 
 */
export default function(){
    let logOutRouter = Router()
    
    // validate the login request's schema
    logOutRouter.use(validateRequest(LoginSchema))

    logOutRouter.post('/doctor',doctorLoginHandler)
    logOutRouter.post('/patient',patientLoginHandler)
    return logOutRouter
}