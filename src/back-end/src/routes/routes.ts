import express, { Express, Request, Response } from "express";
import { createPatientHandler } from "../controller/patient.controller";
import { createDoctorHandler, getOneDoctorHandler } from "../controller/doctor.controller";
import logoutHandler from "../controller/commonLogout.controller";
import validateRequest from "../middleware/validateRequests";
import { createPatientSchema } from "../schema/patient.schema";
import { createDoctorSchema } from "../schema/doctor.schema";
import loginHandler from "./loginRoutes";
import authRouter from "./authorizedRoutes";
import cors from "cors";
import renewAccessTokenHandler from "../controller/tokenRenew.controller";
import { refreshTokenSchema } from "../schema/refreshToken.schema";
import { sendSockCredentials } from '../chat/socketCommunication';
import { createScheduleSchema } from "../schema/schedule.schema";
import { addPatientToScheduleHandler, createScheduleHandler, getSchedulesHandler } from "../controller/schedule.controller";
import { createAppointmentHandler, getAppointmentsOfUserHandler } from "../controller/appointment.controller";


export default function (app: Express) {
  app.use(express.json());
  app.use(cors());
  app.get("/isUp", (req: Request, res: Response) => res.sendStatus(200));

  // create new account
  app.post(
    "/api/newPatient",
    validateRequest(createPatientSchema),
    createPatientHandler
  );
  app.post(
    "/api/newDoctor",
    validateRequest(createDoctorSchema),
    createDoctorHandler
  );

  //get one doctor
  app.get("/api/doctors/:email", getOneDoctorHandler);

  //create a new schedule
  app.post(
    "/api/newSchedule",
    validateRequest(createScheduleSchema),
    createScheduleHandler
  )

  //list all schedules
  app.get("/api/schedules", getSchedulesHandler);

  //update the patients list in a schedule
  app.put("/api/schedules/:id", addPatientToScheduleHandler);


  //create a new appointment
  app.post("/api/newAppointment", createAppointmentHandler) //TODO: validateRequest

  //list all appointments of a particular user
  app.get("/api/appointments/:patient", getAppointmentsOfUserHandler)




  // get password and email from the client and send access, refresh tokens
  // Login has two endpoints for doctor and patient
  app.use("/api/login", loginHandler);
  // Logout use one endpoint for both users
  app.post("/api/logout", validateRequest(refreshTokenSchema), logoutHandler);

  // generate new access token from refresh token
  app.post(
    "/api/token",
    validateRequest(refreshTokenSchema),
    renewAccessTokenHandler
  );

  app.get('/api/socket', (req: Request, res: Response) => { sendSockCredentials(req, res); });

  // Routes which need authentication
  /*  /api/me
   *
   */
  app.use("/api", authRouter);
}
