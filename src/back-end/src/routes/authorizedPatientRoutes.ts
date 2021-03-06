import { Request, Response, Router } from "express";
import { handleProfileGet } from "../controller/patientProfile.controller";

const patientAuthRouter = Router();

// handles /api/patient/profile
patientAuthRouter.get("/profile", handleProfileGet);

export default patientAuthRouter;
