import { Request, Response } from "express";
import refreshTokenModel from "../model/refreshToken.model";
import {
  createAccessToken,
  verifyRefreshToken,
} from "../service/session.service";

async function renewAccessTokenHandler(req: Request, res: Response) {
  const refreshToken: string = req.body.refreshToken;
  try {
    // check the validity of the refresh token
    const isValid: Boolean = await refreshTokenModel.isRefreshTokenValid(
      refreshToken
    );
    if (!isValid) return res.sendStatus(403);
    // get the payload from the token
    const userIdentifier = verifyRefreshToken(refreshToken);
    const { email, type } = userIdentifier;

    // create new access token
    const newAccessToken = createAccessToken({ email, type });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.sendStatus(403);
  }
}

export default renewAccessTokenHandler;
