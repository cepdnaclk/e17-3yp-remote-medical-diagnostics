import express, { Express, Request, Response } from 'express';
import { createPatientHandler } from './controller/patient.controller';
import { createDoctorHandler } from './controller/doctor.controller';
import validateRequest from './middleware/validateRequests';
import { createPatientSchema } from './schema/patient.schema';
import { createDoctorSchema } from './schema/doctor.schema';
import loginHandler from './controller/loginHandler'


export default function (app: Express) {
    app.use(express.json())
    app.get('/isUp', (req: Request, res: Response) => res.sendStatus(200));

    // create new account
    app.post("/api/patient", validateRequest(createPatientSchema), createPatientHandler);
    app.post("/api/doctor", validateRequest(createDoctorSchema), createDoctorHandler);

    // get password and email from the client and send access, refresh tokens 
    app.use('/api/login',loginHandler)
}
