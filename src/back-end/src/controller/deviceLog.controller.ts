import { Request, Response } from "express";
import log from "../logger";

export default async function deviceLogController(req: Request, res: Response) {
  log.info("[device]" + req.body);
  return res.status(200).send(true);
}
