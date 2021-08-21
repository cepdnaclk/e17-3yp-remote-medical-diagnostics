import { validatePassword } from "../service/patient.service";
import { Response, Request } from "express";
import { createAccessToken, createSession } from "../service/session.service";
import { PatientDocument } from "../model/patient.model";
import Config from "../config/default";
import { sign } from "../utils/jwt.util";

export async function createPatientSessionHandler(req: Request, res: Response) {

    //email and password validation
    const user = await validatePassword(req.body) as PatientDocument;

    if (user===null) {
        return res.status(401).send("invalid email or password");
    }

    //create a session
    const session = await createSession(user._id, req.get('user-agent') || "");

    const accessToken = createAccessToken({ user, session });

    const refreshToken = sign(session, {
        expiresIn: Config.accessTokenTtl
    });

    return res.send({ accessToken, refreshToken });

}