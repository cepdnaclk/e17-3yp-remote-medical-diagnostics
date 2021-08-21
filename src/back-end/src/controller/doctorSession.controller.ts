import { validatePassword } from "../service/doctor.service";
import { Response, Request } from "express";
import { createAccessToken, createSession } from "../service/session.service";
import { DoctorDocument } from "../model/doctor.model";
import Config from "../config/default";
import { sign } from "../utils/jwt.util";


export async function createDoctorSessionHandler(req: Request, res: Response) {

    //email and password validation
    const user = await validatePassword(req.body) as Omit<DoctorDocument, "password">;

    if (!user) {
        return res.status(401).send("invalid email or password");
    }

    //create a session
    const session = await createSession(user._id, req.get('user-agent') || "");

    const accessToken = createAccessToken({ user, session });

    const refreshToken = sign(session, {
        expiresIn: Config.refreshTokenTtl
    });

    return res.send({ accessToken, refreshToken });

}