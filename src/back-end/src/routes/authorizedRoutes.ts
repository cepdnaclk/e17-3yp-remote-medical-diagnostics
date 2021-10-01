import { Request, Router } from "express";
import { handleMe } from "../controller/me.controller";
import authenticateToken from "../middleware/authenticateToken";
import patientAuthRouter from "./authorizedPatientRoutes";

const authRouter = Router();
authRouter.use(authenticateToken);

//handles /me endpoint
authRouter.get("/me", handleMe);

//handles authorized requests to the patient
authRouter.use("/patient", patientAuthRouter);

export default authRouter;
