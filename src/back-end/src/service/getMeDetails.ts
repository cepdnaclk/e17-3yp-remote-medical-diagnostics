import Doctor from "../model/doctor.model";
import Patient from "../model/patient.model";

/**
 * Fetches information about a user from the database
 * @param type should be patient or doctor
 * @param email email of the user to identify
 * @returns User details (currently only the name will be returned)
 */
export async function getUserDetailsFromDb(type: string, email: string) {
  let document;
  if (type === "patient") {
    document = await Patient.findOne({ email: email }, "name").exec();
  } else if (type === "doctor") {
    document = await Doctor.findOne({ email: email }, "name").exec();
  }
  return { name: document?.name };
}
