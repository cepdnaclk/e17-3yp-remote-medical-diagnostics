import { authResponse } from "../middleware/authenticateToken";
import { Request } from "express";
import { getPatientProfileDetails } from "../service/getPatientProfileDetails";
import { getDoctorProfileDetails } from "../service/getDoctorProfileDetails";

export async function handleProfileGet(req: Request, res: authResponse) {
  const user = res.locals.user;
  let info;
  if (user.type === "patient") {
    info = await getPatientProfileDetails(user.email);
  } else if (user.type === "doctor") {
    info = await getDoctorProfileDetails(user.email);
  } else {
    info = { userType: "invalid" };
  }

  return res.json(info);
}
