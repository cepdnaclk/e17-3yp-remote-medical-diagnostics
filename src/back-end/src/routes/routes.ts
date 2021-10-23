import express, { Express, Request, Response } from "express";
import { createPatientHandler } from "../controller/patient.controller";
import { createDoctorHandler } from "../controller/doctor.controller";
import logoutHandler from "../controller/commonLogout.controller";
import validateRequest from "../middleware/validateRequests";
import { createPatientSchema } from "../schema/patient.schema";
import { createDoctorSchema } from "../schema/doctor.schema";
import loginHandler from "./loginRoutes";
import authRouter from "./authorizedRoutes";
import cors from "cors";
import renewAccessTokenHandler from "../controller/tokenRenew.controller";
import { refreshTokenSchema } from "../schema/refreshToken.schema";
import { sendSockCredentials } from "../chat/socketCommunication";
import { createAdminSchema } from "../schema/admin.schema";
import { createAdminHandler } from "../controller/admin.controller";
import adminRouter from "./adminRoutes";

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
  app.post(
    "/api/newAdmin",
    validateRequest(createAdminSchema),
    createAdminHandler
  );

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

  app.get("/api/socket", sendSockCredentials);

  app.use("/api/admin", adminRouter);

  // Routes which need authentication
  app.use("/api", authRouter);
}
