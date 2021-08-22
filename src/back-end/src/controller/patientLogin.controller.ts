import { validatePassword } from "../service/patient.service";
import { Response, Request } from "express";
import { createAccessToken, createRefreshToken } from "../service/session.service";
import { PatientDocument } from "../model/patient.model";
import refreshTokenModel from '../model/refreshToken.model'
import log from "../logger";

export async function patientLoginHandler(req: Request, res: Response) {
    //email and password validation
    const user = await validatePassword(req.body) as PatientDocument;
    if (user===null)
        return res.status(401).send("invalid email or password");
    const accessToken = createAccessToken({ email:user.email });
    const refreshToken = createRefreshToken({ email:user.email });
    refreshTokenModel.addNewToken(refreshToken, req.get('User-Agent')||"Unknown")
    return res.send({ accessToken, refreshToken });
}
