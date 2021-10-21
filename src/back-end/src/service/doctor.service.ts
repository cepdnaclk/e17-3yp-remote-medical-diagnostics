import { DocumentDefinition } from "mongoose";
import Doctor, { DoctorDocument } from "../model/doctor.model";
import { omit } from "lodash";

export async function createDoctor(input: DocumentDefinition<DoctorDocument>) {
    try {
        return await Doctor.create(input);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findOneDoctor(email: DoctorDocument["email"]) {
    try {
        return await Doctor.findOne({ email }, 'name license'); //TODO: replace license with specialization
    }
    catch (error: any) {
        throw new Error(error);
    }
}

export async function validatePassword({ email, password }: { email: DoctorDocument["email"]; password: string }) {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
        return null;
    };

    const isValid = await doctor.comparePassword(password);

    if (!isValid) {
        return null;
    }

    return omit(doctor.toJSON(), "password")
};