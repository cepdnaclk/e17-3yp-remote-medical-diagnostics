import { Request, Response, Router } from "express";
import { handlePatientProfileGet } from "../controller/patientProfile.controller";

const patientAuthRouter = Router();

// handles /api/patient/profile
patientAuthRouter.get("/profile", handlePatientProfileGet);

export default patientAuthRouter;
