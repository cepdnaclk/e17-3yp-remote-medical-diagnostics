import mongoose, { mongo } from "mongoose";
import { boolean } from "yup/lib/locale";
import { PatientDocument } from "./patient.model";
import { DoctorDocument } from "./doctor.model";

export interface SessionDocument extends mongoose.Document {
    user: PatientDocument["_id"] | DoctorDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId },
        valid: { type: Boolean, defalut: true },
        userAgent: { type: String }
    },
    { timestamps: true }
);

const Session = mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;