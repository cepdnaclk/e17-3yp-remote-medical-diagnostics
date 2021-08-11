import { DocumentDefinition, FilterQuery } from "mongoose";
import Patient, { PatientDocument } from "../model/patient.model";
import { omit } from "lodash";

export async function createPatient(input: DocumentDefinition<PatientDocument>) {
    try {
        return await Patient.create(input);
    } catch (error) {
        throw new Error(error);
    }
}
function findPatient(query: FilterQuery<PatientDocument>) {
    return Patient.findOne(query).lean();
}

export async function validatePassword({ email, password }: { email: PatientDocument["email"]; password: string }) {
    const patient = await Patient.findOne({ email });

    if (!patient) {
        return false;
    };

    const isValid = await patient.comparePassword(password);

    if (!isValid) {
        return false;
    }

    return omit(patient.toJSON, "password")
};