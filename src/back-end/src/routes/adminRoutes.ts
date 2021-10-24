import { Request, Response, Router } from "express";
import {
  handleExist,
  createAdminHandler,
} from "../controller/admin.controller";
import validateRequest from "../middleware/validateRequests";
import { createAdminSchema } from "../schema/admin.schema";

const adminRouter = Router();

adminRouter.get("/exist", handleExist);
adminRouter.post(
  "/signup",
  validateRequest(createAdminSchema),
  createAdminHandler
);

export default adminRouter;
