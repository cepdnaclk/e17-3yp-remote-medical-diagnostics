import { LeanDocument } from "mongoose";
import Session, { SessionDocument } from "../model/session.model";
import { PatientDocument } from "../model/patient.model";
import { DoctorDocument } from "../model/doctor.model";
import config from 'config';
import { sign } from '../utils/jwt.util';

export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({ user: userId, userAgent });
    return session.toJSON();
}

export function createAccessToken({
    user,
    session
}: {
    user:
    | Omit<PatientDocument, "password">
    | Omit<DoctorDocument, "password">
    | LeanDocument<Omit<PatientDocument, "password">>
    | LeanDocument<Omit<DoctorDocument, "password">>;
    session:
    | Omit<SessionDocument, "password">
    | LeanDocument<Omit<SessionDocument, "password">>;
}) {
    const accessToken = sign(
        { ...user, session: session._id },
        { expiresIn: config.get("accesstokenTtl") }
    );
    return accessToken;
}