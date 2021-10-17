import { validatePassword } from "../service/doctor.service";
import { Response, Request } from "express";
import {
  createAccessToken,
  createRefreshToken,
} from "../service/session.service";
import { DoctorDocument } from "../model/doctor.model";
import refreshTokenModel from "../model/refreshToken.model";
import log from "../logger";

export async function doctorLoginHandler(req: Request, res: Response) {
  //email and password validation
  const user = (await validatePassword(req.body)) as Omit<
    DoctorDocument,
    "password"
  >;

  if (user === null) {
    return res.status(404).send("invalid email or password");
  }
  const accessToken = createAccessToken({ email: user.email, type: "doctor" });
  const refreshToken = createRefreshToken({
    email: user.email,
    type: "doctor",
  });
  refreshTokenModel.addNewToken(
    refreshToken,
    req.get("User-Agent") || "Unknown"
  );
  log.info(`Doctor ${user.email} logged in`);
  return res.send({ accessToken, refreshToken });
}
