import { Request, Response, Router } from "express";
import { handleProfileGet } from "../controller/patientProfile.controller";

const doctorAuthRouter = Router();

// handles /api/patient/profile
doctorAuthRouter.get("/profile", handleProfileGet);

export default doctorAuthRouter;
