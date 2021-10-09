import { authResponse } from "../middleware/authenticateToken";
import { Request } from "express";
import { getPatientProfileDetails } from "../service/getPatientProfileDetails";

export async function handlePatientProfileGet(req: Request, res: authResponse) {
  const user = res.locals.user;
  const info = await getPatientProfileDetails(user.email);

  return res.json(info);
}
