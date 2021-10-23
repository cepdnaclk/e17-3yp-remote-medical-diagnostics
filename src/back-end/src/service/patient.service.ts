import { DocumentDefinition, FilterQuery } from "mongoose";
import Patient, { PatientDocument } from "../model/patient.model";
import { omit } from "lodash";
import log from "../logger";


export async function createPatient(input: DocumentDefinition<PatientDocument>) {
    try {
        return await Patient.create(input);
    } catch (error: any) {
        throw new Error(error);
    }

}
function findPatient(query: FilterQuery<PatientDocument>) {
  return Patient.findOne(query).lean();
}

/** get the user from email and password
    @param email email of the user
    @param password password to verify
    @returns patient
 */
export async function validatePassword({
  email,
  password,
}: {
  email: PatientDocument["email"];
  password: string;
}) {
  const patient = await Patient.findOne({ email }).exec();


    if (patient == null) {
        return null;
    };


  const isValid = await patient.comparePassword(password);

  if (!isValid) {
    return null;
  }
  return omit(patient.toJSON(), "password");
}
