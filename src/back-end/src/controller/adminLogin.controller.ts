import { validatePassword } from "../service/admin.service";
import { Response, Request } from "express";
import {
  createAccessToken,
  createRefreshToken,
} from "../service/session.service";
import { AdminDocument } from "../model/admin.model";
import refreshTokenModel from "../model/refreshToken.model";
import log from "../logger";

export async function adminLoginHandler(req: Request, res: Response) {
  //email and password validation
  const user = (await validatePassword(req.body)) as AdminDocument;
  if (user == null) return res.status(404).send("invalid email or password");
  const accessToken = createAccessToken({ email: user.email, type: "admin" });
  const refreshToken = createRefreshToken({
    email: user.email,
    type: "admin",
  });
  refreshTokenModel.addNewToken(
    refreshToken,
    req.get("User-Agent") || "Unknown"
  );
  log.info(`Admin ${user.email} logged in`);
  return res.send({ accessToken, refreshToken });
}
