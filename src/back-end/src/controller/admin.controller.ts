import { Request, Response } from "express";
import { omit } from "lodash";
import { createAdmin, doesAdminExist } from "../service/admin.service";
import log from "../logger";

export async function createAdminHandler(req: Request, res: Response) {
  const admin = await doesAdminExist();
  if (admin)
    return res
      .status(406)
      .send("Admin already exists. Creating another account is not allowed.");
  try {
    const admin = await createAdmin(req.body);

    return res.send(omit(admin.toJSON(), "password"));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function handleExist(req: Request, res: Response) {
  res.send(await doesAdminExist());
}
