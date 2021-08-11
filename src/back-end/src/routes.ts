import { Express, Request, Response } from 'express';
import { createPatientHandler } from './controller/patient.controller';
import { createDoctorHandler } from './controller/doctor.controller';
import validateRequest from './middleware/validateRequests';
import { createPatientSchema, createPatientSessionSchema } from '../schema/patient.schema';
import { createDoctorSchema, createDoctorSessionSchema } from '../schema/doctor.schema';
import { createPatientSessionHandler } from './controller/patientSession.controller';
import { createDoctorSessionHandler } from './controller/doctorSession.controller';

export default function (app: Express) {
    app.get('/isUp', (req: Request, res: Response) => res.sendStatus(200));

    app.post("/api/patients", validateRequest(createPatientSchema), createPatientHandler);
    app.post("/api/doctor", validateRequest(createDoctorSchema), createDoctorHandler);

    app.post("/api/patient-sessions", validateRequest(createPatientSessionSchema), createPatientSessionHandler);
    app.post("/api/doctor-sessions", validateRequest(createDoctorSessionSchema), createDoctorSessionHandler);
}
