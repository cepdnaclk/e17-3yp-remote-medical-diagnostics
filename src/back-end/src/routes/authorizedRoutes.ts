import { Request, Router } from "express";
import { handleMe } from "../controller/me.controller";
import authenticateToken from "../middleware/authenticateToken";
import doctorAuthRouter from "./authorizedDoctorRoutes";
import patientAuthRouter from "./authorizedPatientRoutes";

const authRouter = Router();
authRouter.use(authenticateToken);

//handles /me endpoint
authRouter.get("/me", handleMe);

//handles authorized requests to the patient
authRouter.use("/patient", patientAuthRouter);

//handles authorized requests to the patient
authRouter.use("/doctor", doctorAuthRouter);
export default authRouter;
