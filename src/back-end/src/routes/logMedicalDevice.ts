import { Router } from "express";
import express from "express";
import deviceLogController from "../controller/deviceLog.controller";

/**
 * Handles requests coming to /deviceLog endpoint
 * @returns a modular router for user Logins
 */
function getDeviceLogsRouter() {
  let deviceLogsRouter = Router();
  deviceLogsRouter.use(express.text());

  deviceLogsRouter.post("/", deviceLogController);
  return deviceLogsRouter;
}
export default getDeviceLogsRouter();
