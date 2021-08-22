import { DocumentDefinition, FilterQuery } from "mongoose";
import Doctor, { DoctorDocument } from "../model/doctor.model";
import { omit } from "lodash";

export async function createDoctor(input: DocumentDefinition<DoctorDocument>) {
    try {
        return await Doctor.create(input);
    } catch (error) {
        throw new Error(error);
    }
}
function findDoctor(query: FilterQuery<DoctorDocument>) {
    return Doctor.findOne(query).lean();
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

    return omit(doctor.toJSON, "password")
};