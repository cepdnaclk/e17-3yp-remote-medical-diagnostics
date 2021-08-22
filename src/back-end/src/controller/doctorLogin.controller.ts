import { validatePassword } from "../service/doctor.service";
import { Response, Request } from "express";
import { createAccessToken, createRefreshToken, createSession } from "../service/session.service";
import { DoctorDocument } from "../model/doctor.model";


export async function doctorLoginHandler(req: Request, res: Response) {
    //email and password validation
    const user = await validatePassword(req.body) as Omit<DoctorDocument, "password">;

    if (user===null) {
        return res.status(401).send("invalid email or password");
    }
    const accessToken = createAccessToken({ email:user.email});
    const refreshToken = createRefreshToken({email: user.email})
    return res.send({ accessToken, refreshToken });
}
